<template>
  <div>
    <el-button type="info" @click="logOut()">退出登录</el-button>
    <el-button type="info" @click="test()">去测试页</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      logOut() {
        sessionStorage.clear()
        this.$router.replace('/login')
      },
      test() {
        this.$router.push('/test')
      }
    }
  }
</script>

<style scoped>

</style>