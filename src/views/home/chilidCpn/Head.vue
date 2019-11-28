<template>
  <div class="home-head">
    <div class="logo">
      <img src="~assets/img/login/avatar.jpg" alt="logo"/>
      <span>后台管理系统Demo</span>
    </div>
    <el-button type="info" @click="logOut()">退出登录</el-button>
  </div>
</template>

<script>
  export default {
    name: "Head",
    methods: {
      logOut() {
        sessionStorage.clear()
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>
  .home-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .logo img {
    width: 48px;
    border-radius: 50%;
  }

  .logo span {
    color: white;
    margin-left: 20px;
  }
</style>