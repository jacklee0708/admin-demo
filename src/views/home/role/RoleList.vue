<template>
  <div>
    <crumb :query="$route.query"></crumb>
    <el-card>
      <tool-bar :need-search="false"/>
    </el-card>
  </div>
</template>

<script>
  import Crumb from 'components/Crumb'
  import ToolBar from 'components/ToolBar'

  export default {
    name: "RoleList",
    components:{
      Crumb,
      ToolBar
    }
  }
</script>

<style scoped>

</style>