<template>
  <div class="business">
    <div class="nav">
      <el-card>
        <el-form :inline="true" :model="form" label-width="69px" ref="form">
          <el-form-item label="企业编号" prop="eid">
            <el-input class="setWidth" v-model="form.eid"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input class="setWidth" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="创建者" prop="username">
            <el-input class="setWidth" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select class="setWidth" placeholder="请选择状态" v-model="form.status">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset">清除</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addBus">新增企业</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 列表内容区域 -->
    <div class="main">
      <!-- el-table
       el-table :data  用于表单数据绑定  注意点：data后面的值要是数组
       el-table-column  每一栏 
          label:每一栏的标题 prop  绑定该栏数据所对应字段 
          width设置每栏的宽度
          自定义样栏
              1：在需要自定义的拦里加一个template（占位符）
              2：获取该行全部数据  <template slot-scope="局部变量">
                局部变量.$index  当前数据下标从0开始
                局部变量.row  整行的所行数据
      -->
      <el-card>
        <el-table :data="tableData">
          <el-table-column label="序号" width="60px">
            <!-- 真实序号=每页条数*（当前页码-1）+当前数据所在下标+1 -->
            <template
              slot-scope="scope"
            >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="企业编号" prop="eid" width="110px"></el-table-column>
          <el-table-column label="企业名称" prop="name" width="200px"></el-table-column>
          <el-table-column label="创建者" prop="username" width="120px"></el-table-column>
          <el-table-column label="创建日期" width="200px" prop="create_time"></el-table-column>
          <el-table-column label="状态" prop="status" width="120px">
            <template slot-scope="scope">
              <!-- :class="{属性:布尔值}  true则执行该属性  false则不执行 -->
              <div :class="{red:scope.row.status==0}">{{scope.row.status == 1?'启用':'禁用'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
              <el-button
                :type="scope.row.status==1?'info':'success'"
                @click="setStatus(scope.row.id)"
              >{{scope.row.status==0?'启用':'禁用'}}</el-button>
              <!-- <el-button type="text">{{scope.row.status==0?'启用':'禁用'}}</el-button> -->
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件
        el-pagination
         current-page  当前页的默认值
         page-size   页容量的默认值
         page-sizes  页容量的选项
         layout你需要什么功能就在里面加什么
         total  总数显示
         size-change  页容量改变时的回调方法  该方法里有个size参数就是当前容量的值
         current-change 页码改变的回调函数  该方法里有个page参数就是当前页码的值
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[4, 8, 12, 16]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          class="pagination"
        ></el-pagination>
      </el-card>
    </div>
    <!--  
      1：新增与编辑写到一个组件里面，既然 是一个组件，我们来了一个mode参数让新增组件可以区别当前是在做哪一步
      props传值   1:在子组件身上定义一个属性   属性名=属性值  2子级件接收该值   props:["属性名"]
      2:要编辑数据得传递给子组件，通过ref修改新增组件的form数据    
         通过refs访问子组件的form表单，给他重新赋值
         1：在子组件身上定义一个ref  ref="值"
         2：通过ref访问子组件里面的from 
            this.$refs.值.form=row的数据  
            尝试克隆   JSON.parse(JSON.stringify())
            
      3:打开子组件弹框
      4:子组件提交接口数据得区别对待
         1：定义编辑接口
         2:在新增组件点击确定时，且mode="edit"时，进行编辑接口调用
      5:修改一下新增处理
         1：修改一下mode
         2:将子组件的form表单数据=原始数据
         3：打开子组件弹框
    -->
    <addBusiness ref="addBusiness" :mode="modeFather" @submit="search"></addBusiness>
  </div>
</template>

<script>
import {
  getBusinessData,
  setBusinessStatus,
  delBusinessData
} from "@/api/business.js";
import addBusiness from "./addBusiness.vue";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      modeFather: "add",
      tableData: [], //企业表格
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        username: "", //创建者
        status: "" //状态
      },
      pagination: {
        currentPage: 1, //当前页
        pageSize: 4, //页容量
        total: 10 //数据总条数
      }
    };
  },
  created() {
    this.getData(); //进入页面即调用方法，获取企业列表
  },
  methods: {
    // 获取企业列表
    getData() {
      let _params = {
        page: this.pagination.currentPage, //页码
        limit: this.pagination.pageSize, //页容量
        ...this.form // 搜索框的所有form数据
      };
      getBusinessData(_params).then(res => {
        console.log("企业列表", res);
        this.tableData = res.data.items; //将返回的数据存起来
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 点击搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 点击清空
    reset() {
      this.$refs.form.resetFields();//清空表单，注意 它只会清空绑定了prop值的
      this.search();
    },
    // 点击新增
    addBus() {
      this.modeFather = "add";
      this.$refs.addBusiness.form = {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //企业备注
      },
        (this.$refs.addBusiness.dialogFormVisible = true);
    },
    // 点击编辑
    edit(row) {
      this.modeFather = "edit";
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
      this.$refs.addBusiness.dialogFormVisible = true;
    },
    // 点击修改状态
    setStatus(id) {
      setBusinessStatus({ id: id }).then(() => {
        this.$message.success("状态修改成功");
        this.getData();
      });
    },
    // 点击删除
    del(id) {
      this.$confirm("您是否要永久删除该条数据", "友情提示", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消操作",
        type: "warning"
      })
        .then(() => {
          delBusinessData({ id }).then(() => {
            this.$message.success("删除成功");
            this.search();
          });
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    // 分页页码操作
    // 页容量改变时
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      //注意 要先回到第一页，再去执行数据的请求
      this.pagination.currentPage = 1; //避免当页码在后面，修改更大页容量时出现顿闪暂无数据的情况
      this.getData();
      // this.search()//与上两句一个意思
    },
    // 页码改变时
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.getData();
    }
  }
};
</script>

<style lang="less">
.business {
  .setWidth {
    width: 116px;
  }
  .main {
    margin-top: 20px;
    .pagination {
      text-align: center;
      margin-top: 20px;
    }
    .red {
      color: red;
    }
  }
}
</style>