<template>
  <el-table :data="userList" ref="userTable" height="458" style="width: 100%" stripe border>
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
    name: "UserTable",
    props: {
      userList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      //出现滚动条时，表头和下方内容不对齐，重置表格的布局
      setTimeout(() => {
        this.$refs.userTable.doLayout()
      }, 500)
    },
    methods: {
      userStateChange(user) {
        this.$message.success(user.name + "的状态变成了" + user.state)
      },
      modifyUserInfo(user) {
        this.$bus.$emit("modifyUserInfo", user)
      },
      removeUser(user) {
        this.$confirm('删除操作不可逆，确定删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: user.name + '已被删除，此处为演示'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除操作已取消'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>