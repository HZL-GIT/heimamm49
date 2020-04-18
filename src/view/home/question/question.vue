<template>
  <div class="question">
    <el-card>
      <el-form :model="form" ref="form" label-width="70px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="form.subject" placeholder="请选择学科">
                <!-- v-show="item.status ==1"只显示启用状态的学科 -->
                <el-option
                  v-for="(item, index) in subjectList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status ==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="form.enterprise" placeholder="请选择企业">
                <!-- v-show="item.status ==1"只显示启用状态的企业 -->
                <el-option
                  v-for="(item, index) in businessList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                  v-show="item.status ==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select v-model="form.type" placeholder="请选择题型">
                <el-option
                  v-for="(value,key, index) in typeObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
                <!-- <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
                <el-option label="简答" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="form.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="(value,key, index) in difficultyObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
                <!-- <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期" prefix-icon></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- label-width 设置el-form-item上的标题宽度（当自己身上有label-width就优先听从自己身上的） -->
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="add">新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="main2">
      <el-table :data="questionData" :border="true">
        <el-table-column label="序号" width="60px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目" prop="title" width="150px">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="100px">
          <!-- 
            对象的点语法   点语法（对象.值）有一个规定。后面的值要符合变量命名  不能以数字开头、不能是中文等
            解决方案      对象的 [] 语法，他没有变量命名的限制规则
          -->
          <!-- <template
            slot-scope="scope"
          >{{scope.row.subject_name}}.{{{ 1: "初级", 2: "中级", 3: "高级" }[scope.row.step]}}</template>-->
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型" prop="type" width="100px">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name" width="100px"></el-table-column>
        <el-table-column label="创建者" prop="username" width="130px"></el-table-column>
        <el-table-column label="状态" prop="status" width="80px">
          <template slot-scope="scope">
            <span :class="{red:scope.row.status == 0}">{{scope.row.status == 1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads" width="80px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              :type="scope.row.status == 1?'warning':'success'"
            >{{scope.row.status == 0?'启用':'禁用'}}</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        class="pagination"
      ></el-pagination>
    </el-card>
    <addQuestion
      ref="addQuestion"
      :subjectList="subjectList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :businessList="businessList"
      :difficultyObj="difficultyObj"
    ></addQuestion>
  </div>
</template>

<script>
import { getQuestionData } from "@/api/question.js";
import { getSubjectData } from "@/api/subject.js"; //请求学科数据
import { getBusinessData } from "@/api/business.js"; //请求企业数据
import addQuestion from "./addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  data() {
    return {
      questionData: [], //题目列表
      pagination: {
        currentPage: 1,
        pageSize: 1,
        total: 10
      },
      form: {
        subject: "", //学科id
        step: "", //题目阶段
        enterprise: "", //企业id
        type: "", //题目类型
        difficulty: "", //题目难度
        username: "", //作者
        status: "", //状态
        create_date: "", //创建日期
        title: "" //标题
      },
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度
      subjectList: [], //学科列表
      businessList: [] //企业列表
    };
  },
  created() {
    // 获取题库数据
    this.getData();
    getSubjectData({ limit: 1000 }).then(res => {
      //学科数据
      // console.log("学科数据", res);
      this.subjectList = res.data.items;
    });
    // {limit:1000}   接口的limit默认只获取10条数据，当数据过多，则后面的获取不到。所以直接设置大一些
    getBusinessData({ limit: 1000 }).then(res => {
      //企业数据
      // console.log("企业数据", res);
      this.businessList = res.data.items;
    });
  },
  methods: {
    // 获取题库数据
    getData() {
      getQuestionData(this.form).then(res => {
        console.log("获取题目数据", res);
        this.questionData = res.data.items; //获取的数据保存到questionData数组上
        //数据返回的总条数保存到分页上
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 点击搜索按钮
    search() {
      console.log("题库搜索验证", this.form);
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 点击清除
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 点击新增
    add() {
      this.$refs.addQuestion.dialogFormVisible = true;
    },

    // 页容量改变时
    handleSizeChange(size) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = size;
      this.search();
    },
    // 页码改变时
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.pagination.currentPage = page;
      this.getData();
    }
  }
};
</script>

<style lang="less">
.question {
  .main2 {
    margin-top: 20px;
    .red {
      color: red;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>