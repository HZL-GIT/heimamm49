<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login-title.png" alt />
        <span class="titleName1">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <!--
        加入表单验证
        1：实现基本布局与数据绑定
        2：在el-form上绑定一个rules属性  rules属性的值要是一个对象
        3:在需要验证的项的el-form-item上定义一个prop属性，prop的值为该项内表单元素v-model绑定的值
        4:在rules里写相应项的验证规则
            [{required:true,message:"手机号必填哦",trigger:"change"}]

        登陆的点击校验
         1.在el-form上定义一个ref  ref="值"
         2.为登陆按钮绑定一个事件
         3.调用el-form的表单验证方法
           this.$refs.form.validate(result=>{
            result它是一个boolean值，
            true验证通过
            false表示 验证不通过
           }) 
      -->
      <div class="lg-body">
        <el-form ref="form" :model="form" :rules="rules" label-width="0px">
          <el-form-item prop="phone">
            <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              :show-password="true"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="16">
                <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="8">
                <img :src="code" @click="codeClick" class="key" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 多选框 -->
          <el-form-item prop="isCheck">
            <el-checkbox v-model="form.isCheck" class="agreement">
              我已阅读并同意
              <el-link type="primary" class="vertical">用户协议</el-link>和
              <el-link type="primary" class="vertical">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginClick" class="login-w">登录</el-button>
            <br />
            <el-button type="primary" class="login-w">注册</el-button>
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
import { toLogin } from "@/api/login.js";
import { saveToken } from "@/utils/token.js";
export default {
  data() {
    return {
      code: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "", //用户手机号
        password: "", //密码框
        code: "", //验证码
        isCheck: "" //条款勾选框
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6到12位的密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "change" }
        ],
        isCheck: [
          { required: true, message: "请勾选用户条款", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value == true) {
                callback();
              } else {
                callback("请勾选用户条款");
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    // 点击登录按钮
    loginClick() {
      this.$refs.form.validate(result => {
        if (result == true) {
          toLogin(this.form).then(res => {
            window.console.log("登录信息", res);
            saveToken(res.data.token);
            this.$message.success("登录成功");
          });
          //result返回的是布尔值，而$message需要的是字符串，所以用 + 号拼接成了字符串
        } else {
          this.$message.error(result + "");
        }
      });
    },
    // 点击刷新验证码
    codeClick() {
      this.code =
        process.env.VUE_APP_URL + "/captcha?type=login$t=" + Date.now();
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
      .vertical {
        vertical-align: top;
      }
      .login-w {
        width: 100%;
        margin-bottom: 26px;
      }
      .key {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>