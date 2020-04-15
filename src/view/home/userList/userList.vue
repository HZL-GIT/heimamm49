<template>
  <div class="userList">
    <el-card>
      <el-form :model="form" ref="form" label-width="70px" :inline="true">
        <el-form-item label="用户名称" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="setWidth" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select class="setWidth" placeholder="请选择状态" v-model="form.role_id">
            <!-- 通过遍历vuex中添加的共享数据绑定 来取到需要的 角色键值对-->
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :value="key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户列表详情 -->
    <el-card class="main1">
      <el-table :data="userList" :border="true"><!--border 加边框-->
        <el-table-column label="序号" width="60px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" width="120px" prop="username"></el-table-column>
        <el-table-column label="电话" width="120px" prop="phone"></el-table-column>
        <el-table-column label="邮箱" width="180px" prop="email"></el-table-column>
        <el-table-column label="角色" width="100px" prop="role"></el-table-column>
        <el-table-column label="备注" width="120px" prop="remark"></el-table-column>
        <el-table-column label="状态" width="70px" prop="status">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status ==0}">{{scope.row.status ==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="primary">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status ==0?'success':'warning'"
            >{{scope.row.status ==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[4, 5, 6, 7]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        class="pagination"
      ></el-pagination>
    </el-card>
    <addUser ref="addUser" :mode="modeFather"></addUser>
  </div>
</template>

<script>
import {
  getuserListData,
  setuserListStatus,
  deluserListData
} from "@/api/userList.js";
import addUser from "./addUser.vue";
export default {
  components: {
    addUser
  },
  data() {
    return {
      modeFather: "add",
      userList: [],
      pagination: {
        currentPage: 1,
        pageSize: 4,
        total: 20
      },
      form: {
        username: "", //用户名称
        email: "", //用户邮箱
        role_id: "" //角色
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取用户列表
    getData() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form //获取前面所有输入框输入的内容
      };
      getuserListData(_params).then(res => {
        console.log(res);
        this.userList = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 点击搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
      // console.log(this.form);
    },
    // 点击清除
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 点击新增用户
    add() {
      this.modeFather = "add";
      this.$refs.addUser.form = {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //电话
        role_id: "", //角色
        status: "", //状态
        remark: "" //用户备注
      };
      this.$refs.addUser.dialogFormVisible = true;
    },
    // 编辑用户
    edit(row) {
      // console.log(row);
      this.modeFather = "edit";
      this.$refs.addUser.form = JSON.parse(JSON.stringify(row));
      this.$refs.addUser.dialogFormVisible = true;
    },
    // 设置用户状态
    setStatus(id) {
      setuserListStatus({ id })
        .then(() => {
          this.$message.success("修改成功");
          this.getData();
        })
        .catch(() => {});
    },
    // 删除用户
    del(id) {
      this.$confirm("您确定要永久删除该用户吗？", "友情提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deluserListData({ id }).then(() => {
            this.$message.success("删除成功");
            this.search();
          });
        })
        .catch(() => {
          this.$message("已取消操作");
        });
    },
    // 页容量改变时
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.pagination.currentPage = 1; //注意 要先回到第一页，再去执行数据的请求
      this.getData();
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
.userList {
  .setWidth {
    width: 150px;
  }
  .main1 {
    margin-top: 20px;
  }
  .red {
    color: red;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>