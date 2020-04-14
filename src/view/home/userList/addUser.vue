<template>
  <div class="addUser">
    <el-dialog :visible.sync="dialogFormVisible" width="600px">
      <div slot="title" class="title">{{this.mode=='add'?'新增用户':'编辑用户'}}</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.trim="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请选择角色" v-model="form.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model.trim="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model.trim="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submitClick">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adduserListData, edituserListData } from "@/api/userList.js";
export default {
  //   props: { // props 方式一
  //     mode: {
  //       type: String
  //     }
  //   },
  props: ["mode"], // props 方式二  简写
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //电话
        role_id: "", //角色
        status: "", //状态
        remark: "" //用户备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱地址");
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
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
        role_id: [{ required: true, message: "请输入角色", trigger: "blur" }]
      }
    };
  },
  watch: {//侦听器
    // 当mode改变的时候清空表单
    mode() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    }
  },
  methods: {
    // 点击确定按钮
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            adduserListData(this.form)
              .then(() => {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                this.$parent.search();
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            edituserListData(this.form)
              .then(() => {
                this.$message.success("编辑成功");
                this.dialogFormVisible = false;
                this.$parent.search();
              })
              .catch(() => {});
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addUser {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 53px;
    text-align: center;
    line-height: 53px;
    color: #fff;
    background: linear-gradient(to right, #00c6f9, #1394fa);
  }
}
</style>