<template>
  <div class="register">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="600px" :show-close="false">
      <div slot="title" class="dialog-title">用户登录</div>
      <!-- form start -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item label="图形码">
          <el-row>
            <el-col :span="16">
              <el-input v-model="ruleForm.imgCode"></el-input>
            </el-col>
            <el-col :span="8">
              <img src="../../assets/img/key.jpg" alt class="mleft" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row>
            <el-col :span="16">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button class="mleft">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- form end -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制表单显示与否
      dialogFormVisible: false,

      ruleForm: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        code: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "change" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "change" },
          { min: 11, max: 11, message: "请正确输入手机号码", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 4, max: 16, message: "请输入4到16位密码", trigger: "change" }
        ],
        imgCode: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "change" }
        ]
      }
    };
  }
};
</script>

<style lang="less">
.register {
  .dialog-title {
    height: 53px;
    text-align: center;
    font-size: 18px;
    line-height: 53px;
    color: white;
    background: linear-gradient(
      225deg,
      rgba(19, 148, 252, 1),
      rgba(2, 198, 252, 1)
    );
  }
  .el-dialog__header {
    padding: 0;
  }
  .dialog-footer {
    text-align: center;
  }
  .mleft {
    height: 40px;
    margin-left: 20px;
  }
}
</style>