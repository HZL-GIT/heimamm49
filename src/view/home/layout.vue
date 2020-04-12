<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse = !collapse"></i>
        <img class="marginlr" src="@/assets/img/login-title.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="$store.state.userInfo.avatar" alt />
        <span class="name">{{$store.state.userInfo.username}}，您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 导航菜单 开始 -->
      <!-- 菜单组件
        el-menu   default-active默认打开哪一项对应下面子项的index值
        el-menu-item  它就是菜单的每一项  它里面的index就表示 当前项的值，与default-active对应
        i表示 图标处理
        slot="title"  重写标题
      -->
      <!-- 
        collapse控制菜单是否折叠 
        加上它，它就会在el-menu上产生一个class   el-menu--collapse
          /* 该动画实现实际 就是一个transition  width
            transition动画实现，要有效果，要起始width  结束时的width,width动画才会有
          */
        然后为了实现动画效果，我们得给一个初始宽度，因为默认是没设置宽度的
        menuTransition就是el-menu上定义的一个class 
        .menuTransition:not(.el-menu--collapse) {
        // 初始宽度
        width: 160px;
        }
        注意点：我们得设置el-aside的宽度为auto,不能写死，不然就没有适配效果了
      -->
      <el-aside width="auto" class="aside">
        <el-menu
          :router="true"
          default-active="$route.fullPath"
          :collapse="collapse"
          class="menuTransition"
        >
          <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-office-building"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 导航菜单 结束 -->

      <!-- 右侧主体区域 开始 -->
      <!-- 
          1:在相应位置加一个routerview 
          2:配制相应路由,在相应的路由配制里面加一个children:[//这里面又可以写相应的子集配制了]
              仿树形结构 
      -->
      <el-main class="main">
        <!-- 左侧导航列表内容输出区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, exitLogin } from "@/api/home.js";
import { getToken, removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      uersInfo: "",
      collapse: false //控制左侧列表显示与否
    };
  },
  created() {
    // 查看当前页相对路径，即为this.$route里的fullPath
    // window.console.log("当前路由信息",this.$route);
    // 进入当前页，判断用户有无登录，没登录则直接返回到登录页，不再执行后面的代码
    if (!getToken()) {
      this.$router.push("/");
      return;
    }
    // 获取用户信息
    getUserInfo().then(res => {
      console.log(res);
      this.userInfo = res.data;
      // 用户头像返回的是相对地址，需要加上基地址才能正常显示头像图片
      this.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
        this.$store.state.userInfo = this.userInfo
    });
  },
  methods: {
    // 点击退出登录按钮
    exit() {
      this.$confirm("是否要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning" // type：warning success error
      }).then(() => {
        // .then是点击 确定后的回调函数
        exitLogin().then(() => {
          removeToken();
          this.$router.push("/");
        });
      }); //在这里取消按钮点击后不做任何操作，故省略未写
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
  // 控制左侧列表显示与否的动画
  .menuTransition:not(.el-menu--collapse) {
    width: 200px;
  }
  .main {
    background-color: #E8E9EC;
  }
}
</style>