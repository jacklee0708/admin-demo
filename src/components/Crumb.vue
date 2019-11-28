<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{query.itemName}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{query.childName}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "crumb",
    props: {
      query: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    padding-bottom: 15px
  }
</style>