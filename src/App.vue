<template>
  <div id="app">
    <div class="text"></div>
    <el-button type="primary">主要按钮</el-button>
    <router-link to="/">跳转</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.text {
  width: 200px;
  height: 200px;
  border: 2px solid #000;
}
</style>