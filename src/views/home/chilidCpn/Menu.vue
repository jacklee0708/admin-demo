<template>
  <div class="home-menu">
    <!--菜单伸缩-->
    <div class="toggle-button" @click="shrinkage()">
      <i :class="!$store.state.shrinkage?'el-icon-s-fold':'el-icon-s-unfold'"></i>
      <span v-show="!$store.state.shrinkage">收缩菜单</span>
    </div>

    <!--侧边菜单-->
    <el-menu background-color="#20222A"
             text-color="#fff"
             active-text-color="#409eff"
             unique-opened
             :collapse="$store.state.shrinkage"
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
  </div>
</template>

<script>
  export default {
    name: "Menu",
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      shrinkage() {
        this.$store.commit('changeShrinkage')
      },
      itemClick(item, child) {
        const path = "/" + child.path
        if (this.$route.path !== path) {
          this.$router.push({
            path: path,
            query: {
              itemName: item.menuName,
              childName: child.menuName
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
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
</style>