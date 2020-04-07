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
            <el-col :span="7" :offset="1">
              <img src="../../assets/img/key.jpg" alt class="codeImgHeight" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row>
            <el-col :span="16">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button>获取用户验证码</el-button>
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

      baseURL: process.env.VUE_APP_URL,
      imageUrl: "",
      ruleForm: {
        avatar: "", //头像路径保存
        name: "", //用户姓名
        email: "", //用户邮箱
        phone: "", //用户手机
        password: "", //用户密码
        imgCode: "", //图形码
        code: "" //验证码
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "change" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
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
  },
  methods: {
    // handleAvatarSuccess(res,flie) {
    // this.imageUrl = URL.createObjectURL(file.raw);
    // 上下两种效果一致
    handleAvatarSuccess(res) {
      console.log(res);
      // 用基地址拼接上接口返回的路径信息，得到图片的路径
      this.imageUrl = this.baseURL + "/" + res.data.file_path;
      this.ruleForm.avatar = res.data.file_path;
    },
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
  .codeImgHeight {
    height: 40px;
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