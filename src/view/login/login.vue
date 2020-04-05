<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login-title.png" alt />
        <span class="titleName1">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <div class="lg-body">
        <el-form ref="form" :model="form" label-width="0px">
          <el-form-item>
            <el-input v-model="form.tel" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              :show-password="true"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="16">
                <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="8">验证码图片</el-col>
            </el-row>
          </el-form-item>
          <!-- 多选框 -->
          <el-checkbox v-model="checked" class="agreement">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
          <el-form-item>
            <el-row>
              <el-col>
                <el-button type="primary" @click="onSubmit" class="login-w">登录</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-button type="primary" class="login-w">注册</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="rigth">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        tel: "",
        password: "",
        code: "",
        checked: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less">
.login {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 30px;
    background: rgba(245, 245, 245, 1);
    .title {
      margin-top: 18px;
      color: rgba(12, 12, 12, 1);
      .titleName1 {
        font-size: 24px;
        font-weight: 400;
        padding: 15px;
      }
      .titleLine {
        font-size: 28px;
        color: #ccc;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        padding: 15px;
      }
    }
    .lg-body {
      margin-top: 30px;
      .agreement {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
        margin-bottom: 28px;
      }
      .login-w {
        width: 100%;
        margin-bottom: 26px;
      }
    }
  }
}
</style>