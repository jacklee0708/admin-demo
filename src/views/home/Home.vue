<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div class="logo">
          <img src="~assets/img/login/avatar.jpg" alt="logo"/>
          <span>后台管理系统Demo</span>
        </div>
        <el-button type="info" @click="logOut()">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            background-color="#20222A"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-button type="info" @click="test()">test</el-button>
        </el-main>
      </el-container>
    </el-container>
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
     async test() {
        try {
          const res = await this.$request.get('test', this.loginForm)
          console.log(res);
        } catch (err) {

        }
      }
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100vh;
  }

  .el-header {
    background-color: #20222A;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    background-color: #20222A;
  }

  .el-main {
    background-color: #EAEDF1;
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