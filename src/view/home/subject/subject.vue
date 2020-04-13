<template>
  <div class="subject">
    <div class="top">
      <!-- 头部搜索区域 -->
      <el-card>
        <!-- inline就是将表单form下面的form-item由块级元素转成行内块级元素，不让他们独占一行 -->
        <el-form label-width="69px" :inline="true" :model="form" ref="form">
          <el-form-item label="学科编号" prop="rid">
            <el-input class="inputWidth" v-model="form.rid"></el-input>
          </el-form-item>
          <el-form-item label="学科名称" prop="name">
            <el-input class="inputWidth" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="创建者" prop="username">
            <el-input class="inputWidth" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <!--下拉 选择框
                原生的 select  到了element   el-select
                原生的子项 option            el-option
                        value                 value
                        表现出来的文字(我们看到的选项文字)  label
                        v-model="双向绑定的值"
                  注意：el-checkbox   它的值是哪个关键字？ 它的值是label
                  icon="el-icon-caret-bottom"
            -->
            <el-select v-model="form.status" placeholder="请选择状态" class="inputWidth">
              <el-option value="1" label="启用"></el-option>
              <el-option value="0" label="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset">清除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="add">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 主体内容展示区域 -->
    <div class="main">
      <el-card>
        <el-table :data="tableData">
          <el-table-column label="序号" width="60">
            <!-- 
              序号优化
              真实序号 = （当前页-1）*页容量 + 当前序号(从0开始的)+1
              (pagination.currentPage-1) * pagination.pageSize + scope.$index + 1
            -->
            <template
              slot-scope="scope"
            >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="学科编号" prop="rid" width="120px"></el-table-column>
          <el-table-column label="学科名称" prop="name" width="200px"></el-table-column>
          <el-table-column label="简称" prop="short_name" width="120px"></el-table-column>
          <el-table-column label="创建者" prop="username" width="130px"></el-table-column>
          <el-table-column label="创建日期" prop="create_time" width="200px"></el-table-column>
          <el-table-column label="状态" prop="status" width="100px">
            <template slot-scope="scope">{{scope.row.status == 1 ? '启用':'禁用'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <!-- 
                {{scope.row.status == 0 ? '启用':'禁用'}}  与上面的状态呈相反效果
                你显示启用了，则按钮就为禁用
                你显示禁用了，则按钮就为启用
              -->
              <el-button
                type="text"
                @click="setStatus(scope.row.id)"
              >{{scope.row.status == 0 ? '启用':'禁用'}}</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页导航-->
        <!-- 
          current-page ：当前页
          page-sizes  ：每页条数选项[每页条数设置]
          page-size：当前 是每页多少条
          layout：定义功能的
          total:总共多少条
          方法：
        size-change 修改页容量时的回调函数，该回调函数有一个参数是当前值是每页多少条的值
        current-change   	改变页码时会触发的回调函数，该函数有一个参数是当前在第几页 
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          class="pagination"
        ></el-pagination>
      </el-card>
    </div>
    <!-- 新增学科 的对话框 子组件 -->
    <addSubject ref="addSubject" :mode="mode" @addBtn='search'></addSubject>
  </div>
</template>

<script>
import {
  getSubjectData,
  getSubjectStatus,
  delSubjectData
} from "@/api/subject.js";
import addSubject from "./addSubject.vue";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add",
      // 表格数据，学科列表的数据
      tableData: [],
      // 分页
      pagination: {
        currentPage: 1, //当前页数
        pageSize: 3, //每页条数
        total: 50 //总条数
      },
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      }
    };
  },
  created() {
    // 进入页面就调用封装好的获取学科列表信息的方法
    this.getData();
  },
  methods: {
    // 点击搜索
    search() {
      this.pagination.currentPage = 1; //修改当前页为第一页
      this.getData();
    },
    // 点击清除按钮
    reset() {
      // 调用表单的resetFields,
      // 1:它使用前提是参数都有相应的prop绑定
      //2:在form表单上定义一个ref=值   通过ref调用resetFields
      this.$refs.form.resetFields(); //清除表单数据
      this.search(); //重新按照默认的来搜索
    },
    //  点击新增按钮
    add() {
      this.mode = "add";
      this.$refs.addSubject.form = {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      };
      this.$refs.addSubject.dialogFormVisible = true; //显示对话框
    },
    // 获取学科列表信息
    getData() {
      let _params = {
        page: this.pagination.currentPage, //页码
        limit: this.pagination.pageSize, //页容量
        ...this.form // ...为ES6语法，拓展运算符，遍历   与表单的ref值无关
      };
      getSubjectData(_params).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 点击编辑按钮  由于编辑与新增的弹出对话框是一样的，所以复用
    edit(row) {
      this.mode = "edit";
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row)); //深克隆
      this.$refs.addSubject.dialogFormVisible = true; //显示对话框
    },
    // 点击禁用
    setStatus(id) {
      // window.console.log(scope);
      //注意传入的是一个对象{id:id}，而不是直接写的id
      getSubjectStatus({ id: id }).then(() => {
        this.$message.success("状态设置成功");
        this.search(); //重新刷新 table 数据
      });
    },
    // 点击删除  删除学科
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确认
          // console.log(id);
          delSubjectData({ id: id }).then(() => {
            this.$message.success("删除成功");
            this.search();
          });
        })
        .catch(() => {
          //点击取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 分页相关
    // 页容量改变时
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val; //当前页容量为val
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 页码改变时
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.currentPage = val; //当前页码为val
      this.getData(); //页码改变时，重新调用学科列表获取方法，重新请求数据并渲染
    }
  }
};
</script>

<style lang="less">
.subject {
  .top {
    .inputWidth {
      width: 116px;
    }
  }
  .main {
    margin-top: 20px;
    .colorBlue {
      color: skyblue;
    }
    .pagination {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>