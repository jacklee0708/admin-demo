<template>
  <div>
    <el-container class="home-container">
      <!--顶部区域-->
      <el-header>
        <div class="logo">
          <img src="~assets/img/login/avatar.jpg" alt="logo"/>
          <span>后台管理系统Demo</span>
        </div>
        <el-button type="info" @click="logOut()">退出登录</el-button>
      </el-header>

      <!--页面主题区域-->
      <el-container>
        <!--侧边栏-->
        <el-aside :width="isShrink?'64px':'200px'">
          <!--菜单伸缩-->
          <div class="toggle-button" @click="telescopic()">
            <i :class="!isShrink?'el-icon-s-fold':'el-icon-s-unfold'"></i>
            <span v-show="!isShrink">收缩菜单</span>
          </div>

          <!--侧边菜单-->
          <el-menu background-color="#20222A"
                   text-color="#fff"
                   active-text-color="#409eff"
                   unique-opened
                   :collapse="isShrink"
                   :collapse-transition="false"
                   :default-active="$route.path">
            <el-submenu v-for="item in menuList"
                        :key="item.id"
                        :index="item.order">
              <template slot="title">
                <i :class="item.menuIcon"></i>
                <span>{{item.menuName}}</span>
              </template>
              <el-menu-item v-for="child in item.children"
                            :key="child.id"
                            :index="'/'+child.path"
                            @click="itemClick(item,child)">
                <template slot="title">
                  <i :class="child.menuIcon"></i>
                  <span>{{child.menuName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!--右侧内容主体-->
        <el-main>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        menuList: [],
        isShrink: false,
        telescopicIcon: 'el-icon-s-fold',
        telescopicTips: '收缩菜单'
      }
    },
    created() {
      this.getMenuList()
    },
    methods: {
      logOut() {
        sessionStorage.clear()
        this.$router.replace('/login')
      },
      async getMenuList() {
        try {
          const res = await this.$request.get('menus')
          if (res.status !== 200) {
            this.$message.error('获取菜单数据失败!')
          } else {
            this.menuList = res.data
          }
        } catch (err) {
          console.log(err)
        }
      },
      telescopic() {
        this.isShrink = !this.isShrink
      },
      itemClick(item,child) {
        const path = "/" + child.path
        if (this.$route.path !== path) {
          this.$router.push({
            path:path,
            query:{
              itemName:item.menuName,
              childName:child.menuName
            }
          })
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

  .el-menu {
    border-right: none;
    user-select: none;
  }

  .toggle-button {
    height: 56px;
    line-height: 56px;
    list-style: none;
    position: relative;
    white-space: nowrap;
    padding: 0 20px;
    color: #FFFFFF;
    background-color: #20222A;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }

  .toggle-button i {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    color: #909399;
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