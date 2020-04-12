<template>
  <div class="subject">
    <div class="top">
      <!-- 头部搜索区域 -->
      <el-card>
        <!-- inline就是将表单form下面的form-item由块级元素转成行内块级元素，不让他们独占一行 -->
        <el-form label-width="69px" :inline="true" :model="form">
          <el-form-item label="学科编号">
            <el-input class="inputWidth" v-model="form.rid"></el-input>
          </el-form-item>
          <el-form-item label="学科名称">
            <el-input class="inputWidth" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input class="inputWidth" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="状态">
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
            <el-button type="primary">搜索</el-button>
            <el-button>清除</el-button>
            <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 主体内容展示区域 -->
    <div class="main">
      <el-card>
        <el-table :data="tableData">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{scope.$index+1}}</template>
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
              <el-button type="text">编辑</el-button>
              <el-button type="text" @click="setStatus(scope)">禁用</el-button>
              <el-button type="text">删除</el-button>
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          class="pagination"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getSubjectData } from "@/api/subject.js";
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      // 分页
      pagination: {
        currentPage: 1, //当前页数
        pageSize: 10, //每页条数
        total: 100 //总条数
      },
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      }
    };
  },
  methods: {
    setStatus(scope) {
      window.console.log(scope);
    },
    // 分页相关
    // 页容量改变时
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val
    },
    // 页码改变时
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.currentPage = val
    }
  },
  created() {
    getSubjectData().then(res => {
      window.console.log(res);
      this.tableData = res.data.items;
    });
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