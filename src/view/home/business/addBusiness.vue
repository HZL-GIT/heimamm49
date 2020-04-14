<template>
  <div class="addBusiness">
    <el-dialog :visible.sync="dialogFormVisible" width="600px">
      <div slot="title" class="title">新增企业</div>
      <el-form :model="form" :rules="rules" label-width="80px" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
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
import { addBusinessData, editlBusinessData } from "@/api/business.js";
export default {
  props: {
    mode: {
      type: String,
    }
  },
//   props:['mode'],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //企业备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击确认按钮
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addBusinessData(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false; //关闭对话框
              this.$parent.search(); //方法一 利用 $parent
              //   this.$emit("submit"); //方法二  利用emit  需要先在父组件的子组件标签里定义 @submit="search"
            });
          } else {
            editlBusinessData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              // this.$parent.search();//方法一 利用 $parent
              this.$emit("submit"); //方法二  利用emit  需要先在父组件的子组件标签里定义 @submit="search"
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addBusiness {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 53px;
    line-height: 53px;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #00c6f7, #1496f7);
  }
  .footer {
    text-align: center;
  }
}
</style>