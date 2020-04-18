<template>
  <div class="addQuestion">
    <!-- fullscreen  是否为全屏显示Dialog 默认false  改为true则为全屏显示 -->
    <el-dialog :visible.sync="dialogFormVisible" :fullscreen="true">
      <div slot="title" class="title">新增题库测试</div>
      <div class="countent">
        <el-form :model="form" ref="form" :rules="rules" label-width="100px">
          <el-form-item label="学科" prop="subject">
            <el-select v-model="form.subject" placeholder="请选择学科">
              <el-option
                v-for="(item, index) in subjectList"
                :key="index"
                :value="item.id"
                :label="item.name"
                v-show="item.status ==1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段" prop="step">
            <el-select v-model="form.step" placeholder="请选择阶段">
              <el-option
                v-for="(value,key, index) in stepObj"
                :key="index"
                :label="value"
                :value="+key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" prop="enterprise">
            <el-select v-model="form.enterprise" placeholder="请选择企业">
              <el-option
                v-for="(item, index) in businessList"
                :key="index"
                :value="item.id"
                :label="item.name"
                v-show="item.status ==1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <!-- 联动选择        
                v-model  双向绑定，它的值是数组
                options  我们需要选择的数据，默认数据里面label就是我们看得到的，value就是我们选择该项的值,children就是自己子集 
                props进行修改  :props="{可以修改默认配制比如   value:"label"  value 是更改取值的属性名  label 可以更改我们看得到的属性名}"

                应用场景：城市选择
            -->
            <!-- {{form.city}}  {{options}} -->
            <!-- :props="{value:'label'}"将value的值改为label的值 -->
            <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
          </el-form-item>
          <el-form-item label="题型" prop="type">
            <el-radio-group v-model="form.type">
              <!-- 单选框与多选框的label绑定的是他们的值，与其他组件的label有区别，其他的label通常绑定的是我们看到页面显示的文本 -->
              <el-radio v-for="(value,key, index) in typeObj" :key="index" :label="+key">{{value}}</el-radio>
              <!-- <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
              <el-radio :label="3">简答</el-radio>-->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度" prop="difficulty">
            <el-radio-group v-model="form.difficulty">
              <el-radio
                v-for="(value, key,index) in difficultyObj"
                :key="index"
                :label="+key"
              >{{value}}</el-radio>
              <!-- <el-radio :label="1">简单</el-radio>
              <el-radio :label="2">一般</el-radio>
              <el-radio :label="3">困难</el-radio>-->
            </el-radio-group>
          </el-form-item>
          <hr />
          <el-form-item label="试题标题" prop="title" class="setMargin">
            <!-- 富文本编辑器 -->
            <quillEditor
              v-model="form.title"
              @change="changeEvent"
              :options="{placeholder:'请在这里输入...'}"
            ></quillEditor>
          </el-form-item>
          <!-- 题型部分 -->
          <!--
             在抽离组件将题目渲染出来，但是我们题目的提交还是在父组件，需要从父组件将题目传递过去到子组件
          -->
          <el-form-item :label="typeObj[form.type]">
            <!-- 对象传递：子组件将会和父组件数据统一，子组件里数据变了，父组件也会变 -->
            <allSelect :form="form"></allSelect>
          </el-form-item>
          <hr />
          <br>
          <!-- 视频解析部分 -->
          <el-form-item label="解析视频">
            <uploadFile v-model="form.video" type="video"></uploadFile>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 富文本编辑器导包
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import { regionData } from "element-china-area-data"; //城市级联选择器导包

import allSelect from "./allSelect.vue"; //单选题型部分
import uploadFile from "./uploadFile.vue"; //文件上传部分

export default {
  // 因为这里用到的数据在父元素中都有，所以采用 props 父传子的形式，将需要的数据传递过来
  props: ["subjectList", "stepObj", "typeObj", "businessList", "difficultyObj"],
  components: {
    quillEditor,
    allSelect,
    uploadFile
  },
  data() {
    return {
      dialogFormVisible: false, //控制对话框显示与否
      // import 导入的数据不能直接在HTML中使用，所以用options存起来，再去使用
      options: regionData, //中国省市区级联数据
      form: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        city: [], //城市
        type: 1, //题型
        difficulty: 1, //难度
        title: "", //试题标题
        single_select_answer: "", //单选题答案
        multiple_select_answer: [], //多选答案
        short_answer: "", //简答题答案
        video: "", //解析视频地址
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "blur" }],
        step: [{ required: true, message: "请选择阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }],
        type: [{ required: true, message: "请选择题型", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "blur" }
        ],
        title: [{ required: true, message: "请填写试题标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 富文本编辑器相关
    changeEvent(val) {
      console.log(val);
    },
    submit() {
      console.log(this.form);
    }
  }
};
</script>

<style lang="less">
.addQuestion {
  .el-dialog__header {
    padding: 0;
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    line-height: 53px;
    color: #fff;
    padding-left: 30px;
    background: linear-gradient(to right, #01c4fa, #1394fa);
  }
  .countent {
    width: 832px;
    margin: 0 auto;
    .setMargin {
      .el-form-item__content {
        margin-left: 0 !important;
        margin-top: 50px;
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>