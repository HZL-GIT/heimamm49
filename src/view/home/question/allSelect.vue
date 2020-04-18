<template>
  <div class="allSelect">
    <div v-if="form.type==1">
      <!-- 这里是单选 -->
      <div v-for="(item, index) in form.select_options" :key="index" class="item">
        <!-- radio label才是它的值 -->
        <el-radio v-model="form.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <!-- 这里用到了 v-model 传值 -->
        <!-- <uploadFile :value="item.image" @input="uploadSuccess"></uploadFile> -->
        <uploadFile v-model="item.image"></uploadFile>
      </div>
    </div>
    <div v-else-if="form.type==2">
      <!-- 这里是多选 -->
      <div v-for="(item, index) in form.select_options" :key="index" class="item">
        <!-- radio label才是它的值 -->
        <el-checkbox v-model="form.multiple_select_answer" :label="item.label">{{item.label}}</el-checkbox>
        <el-input v-model="item.text"></el-input>
        <uploadFile v-model="item.image"></uploadFile>
      </div>
    </div>
    <div v-else>
      <!-- 这里是简答题 -->
      <!-- 类似原生的textarea      rows：多少行 -->
      <el-input type="textarea" rows="10" v-model="form.short_answer"></el-input>
    </div>
  </div>
</template>

<script>
import uploadFile from "./uploadFile.vue";
export default {
  props: ["form"],
  components: {
    uploadFile
  },
  data() {
    return {};
  },
  methods: {
      uploadSuccess(val){
          console.log(val);
      }
  },
};
</script>

<style lang="less">
.allSelect {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>