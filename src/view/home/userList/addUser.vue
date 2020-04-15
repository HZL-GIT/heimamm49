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
            <!-- 
              由于 role_id 传过来的 value 值是number类型，而通过键值对得到的 key 值是string类型
              所以需要在 key 前加上 + 号，实现隐式转换，转成number类型
            -->
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model.trim="form.status">
            <!-- 
              value='1' 中的 1 是字符串类型，而编辑时通过row传过来的数据是 数字类型 
              所以也需要转车 数字类型 才行  故而写为   :value="1"
            -->
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
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
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          // 自定义表单验证
          /*
          validator:(rule,value,callback)=>{
            rule:规则,
            value:当前 需要验证项的值 
            callback()  这样就是正常验证通过
            callback("错误信息") 表示 不验证通过，同时报出内面的错误信息
          }
          */
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱地址");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            },
            trigger: "change"
          }
        ],
        role_id: [{ required: true, message: "请输入角色", trigger: "change" }]
      }
    };
  },
  watch: {
    // 侦听器
    // 当dialogFormVisible 为true 即对话框为打开状态时，先将表单的验证给清除掉，否则会出现验证报红问题
    // 并且由于表单是后面打开对话框才加载出来的，所以需要利用 $nextTick 进行延时操作
    dialogFormVisible(newValue) {
      if (newValue == true) {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
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