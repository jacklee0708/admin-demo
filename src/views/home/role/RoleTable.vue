<template>
  <el-table :data="roleList" ref="userTable" height="458" style="width: 100%" stripe border>
    <el-table-column type="index"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="email" label="邮箱"/>
    <el-table-column prop="phone" label="手机"/>
    <el-table-column prop="role" label="角色"/>
    <el-table-column prop="state" label="状态">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.state" @change="userStateChange(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="modifyUserInfo(scope.row)" icon="el-icon-edit" size="mini"></el-button>
        <el-button type="danger" @click="removeUser(scope.row)" icon="el-icon-delete" size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "RoleTable"
  }
</script>

<style scoped>

</style>