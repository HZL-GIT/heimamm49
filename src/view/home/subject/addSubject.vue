<template>
  <div class="addSubject">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="600px">
      <div slot="title" class="dialog-title">{{mode=='add'?'新增学科':'编辑学科'}}</div>
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  props: {
    //父传子
    mode: {
      type: String, //设置传过来的值的数据类型
      default: "add" //设置默认值
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        // this.$refs.form.clearValidate();
        //   清空表单  注意：需要清空的项一定要在el-form-item上加上prop绑定相应字段
        this.$refs.form.resetFields();
      }
    },
    // 用于解决，添加了编辑功能后，打开新增会自动验证表单，从而出现红字报错的问题
    mode() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    }
  },
  methods: {
    // 新增学科 的对话框 点击确定按钮
    submitClick() {
      // 全局验证
      this.$refs.form.validate(result => {
        window.console.log(result);
        // 同一确认按钮的复用处理
        if (this.mode == "add") {
          //当mode为add时是新增
          addSubjectData(this.form).then(() => {
            // 新增成功处理
            this.$message.success("新增成功"); //提示用户新增成功
            this.dialogFormVisible = false; //关闭对话框
            // this.$parent.search(); //新增完成，重新刷新数据
            //  子调用父方法        emit
            //  1：在父组件 引入 的子组件身上绑定相应方法   
            //                      <子组件  @子组件方法名="父组件方法">
            //  2：子组件触发该方法   this.$emit("子组件方法名",可以写参数)
            this.$emit("addBtn");
          });
        } else {
          //在父组件编写点击编辑按钮修改mode值为edit，
          editSubjectData(this.form).then(() => {
            this.$message.success("编辑成功"); //提示用户新增成功
            this.dialogFormVisible = false; //关闭对话框
            this.$parent.search(); //新增完成，重新刷新数据
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.addSubject {
  .dialog-title {
    color: white;
    text-align: center;
    height: 53px;
    line-height: 53px;
    background: linear-gradient(to right, #00c6f7, #1496f7);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>