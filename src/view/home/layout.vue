<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight"></i>
        <img class="marginlr" src="@/assets/img/login-title.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="uersInfo.avatar" alt />
        <span class="name">{{uersInfo.username}}，您好</span>
        <el-button type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getUserInfo} from '@/api/home.js'
export default {
  data() {
    return {
      uersInfo:''
    }
  },
  created() {
    // 获取用户信息
    getUserInfo().then(res=>{
      console.log(res);
      this.uersInfo = res.data;
      // 用户头像返回的是相对地址，需要加上基地址才能正常显示头像图片
      this.uersInfo.avatar = process.env.VUE_APP_URL + '/'+this.uersInfo.avatar
    })
  },
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
}
</style>