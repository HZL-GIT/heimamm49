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
        <el-form-item label="头像" prop="avatar">
          <!-- 上传东西
            el-upload
              1:上传地址  action  注意在前面添加 : 号，使得后面的代码按js执行，不加则是按字符串执行
              2：参数     name="值" 该值就是上传文件的参数，参数名在接口文档会有体现
              3:是否显示已上传文件列表    show-file-list 
              4:上传成功的回调函数   on-success
                  成功回调函数里面有个res就是接口返回信息
                  上传成功后须在form表单数据里面保存一下该图像avatar值
              5：上传前的处理（还没调用上传接口前的处理）       before-upload
                  上传前处理它有一个file文件信息，通过file文件信息能够限制上传格式（file.type），大小等控制  (file.size以字节)
                  该回调函数return的值就是控制让不让你通过  true通过  false不通过
          -->
          <el-upload
            class="avatar-uploader"
            :action="baseURL+'/uploads'"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="codeUrl" alt class="code" @click="changeCodeUrl" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="ruleForm.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="getRecode" :disabled="totalTime!=60">
                获取用户验证码
                <span v-if="totalTime != 60">{{totalTime}}</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- form end -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import getPhoneCode from "@/api/register.js";
import { getPhoneCode, register } from "@/api/register.js";
export default {
  data() {
    return {
      // 控制表单显示与否
      dialogFormVisible: false,
      // 开发 环境变量中的基地址
      baseURL: process.env.VUE_APP_URL,
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      imageUrl: "", //本地显示的路径
      totalTime: 60, //验证码倒计时
      // 表单中的内容绑定
      ruleForm: {
        avatar: "", //头像路径保存，后续需要上传到
        username: "", //用户姓名
        email: "", //用户邮箱
        phone: "", //用户手机
        password: "", //用户密码
        code: "", //图形码
        rcode: "" //验证码
      },
      // 表单验证规则
      rules: {
        avatar: [{ required: true, message: "请上传图片", trigger: "change" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              //自定义表单验证规则
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                //正则表达式利用 test() 方法调用
                callback();
              } else {
                callback("请输入正确的邮箱地址");
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "change" },
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
          { min: 6, max: 12, message: "请输入6到12位密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "change" }
        ]
      }
    };
  },
  // 监听器
  /*
  对某个值进行一个监听，如果它改变了，可以对它进行一些相应处理
  // 只要dialogFormVisible为false了就要清空表单
  1：放到watch:{}
  2：写要要监听的值  this.dialogFormVisible
  3：去掉this把该传转换成字符串 dialogFormVisible
  4:监听器本质就是一个function (newVal,oldval){}
     newVal当前值，oldVal修改前一刻的值
  */
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$refs.ruleForm.resetFields();//清空表单
        this.imageUrl = "";//清空头像框
      }
    }
  },
  methods: {
    // 点击确定按钮，进行全表单验证
    submitForm() {
      this.$refs.ruleForm.validate(result => {
        // alert(result);
        // this.$message.success(result + "");
        if (result) {
          register(this.ruleForm).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    // 点击取消按钮
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
    // handleAvatarSuccess(res,flie) {
    // this.imageUrl = URL.createObjectURL(file.raw);
    // 上下两种效果一致
    //文件上传成功执行
    handleAvatarSuccess(res) {
      console.log(res);
      // 用基地址拼接上接口返回的路径信息，得到图片的路径
      this.imageUrl = this.baseURL + "/" + res.data.file_path;
      this.ruleForm.avatar = res.data.file_path;
      // 由于触发全表单验证需要数据的双向绑定（v-model），而文件上传没有进行双向绑定，所以需要单独给文件上传做一个验证，以便于在文件上传成功之后就进行一次验证，消除提示的报错信息
      // 由于上传图片该组件的值不能双向绑定，所以它要主动触发验证
      // this.$refs.form.validateField(需要验证的项)
      this.$refs.ruleForm.validateField("avatar");
    },
    //文件上传成功之前做校验
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击改变图片验证码
    changeCodeUrl() {
      // 为了避免浏览器缓存，加入时间戳（或随机数），以达到点击刷新图形码请求不同的效果
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取表单验证码
    getRecode() {
      let _pass = true;
      // 需要填写了手机号码与图形码之后才允许发送短信验证码
      this.$refs.ruleForm.validateField(["phone", "code"], error => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        // 调用接口函数获取验证码
        // 倒计时功能
        this.totalTime--;
        let _interval = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= 0) {
            clearInterval(_interval);
            this.totalTime = 60;
          }
        }, 1000);

        getPhoneCode({
          code: this.ruleForm.code,
          phone: this.ruleForm.phone
        }).then(res => {
          console.log(res);
          this.$message.success(res.data.captcha + "");
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
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

  .dialog-footer {
    text-align: center;
  }
  .code {
    width: 100%;
    height: 40px;
    border: 1px solid #000;
  }
}
</style>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>