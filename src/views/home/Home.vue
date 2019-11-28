<template>
  <div class="home">
    <el-container class="home-container">

      <el-header>
        <home-head/>
      </el-header>

      <el-container>

        <el-aside :width="$store.state.shrinkage?'64px':'200px'">
          <home-menu :menuList="menuList"/>
        </el-aside>

        <el-main>
          <router-view/>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
  import HomeHead from './chilidCpn/Head'
  import homeMenu from './chilidCpn/Menu'

  export default {
    name: "Home",
    data() {
      return {
        menuList: [],
        isShrink: false
      }
    },
    components: {
      HomeHead,
      homeMenu
    },
    created() {
      this.getMenuList()
    },
    methods: {
      async getMenuList() {
        try {
          const res = await this.$request.get('menus')
          if (res.status !== 200) {
            this.$message.error('获取菜单数据失败!')
          } else {
            this.menuList = res.data
          }
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
    padding: 0;
  }

  .el-aside {
    background-color: #20222A;
  }

  .el-main {
    background-color: #EAEDF1;
  }
</style>