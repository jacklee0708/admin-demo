<template>
  <div class="user-list">
    <crumb :query="$route.query"></crumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="query.name" clearable @clear="getUserList"
                    @keyup.enter.native="search">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="AddUser">新增用户</el-button>
        </el-col>
      </el-row>
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
            <el-button type="danger" @click="removeUser()" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" center @close="clearValidate">
      <add-user :dialogVisible="dialogVisible"
                 :isModify="isModify"
                 :selectedRow="selectedRow"
                 @closeWindow="closeWindow"/>
    </el-dialog>
  </div>
</template>

<script>
  import Crumb from 'components/Crumb'
  import AddUser from './AddUser'

  export default {
    name: "userList",
    components: {
      Crumb,
      AddUser
    },
    data() {
      return {
        query: {
          page: 1,
          limit: 10,
          name: ''
        },
        userList: [],
        total: 0,
        dialogVisible: false,
        dialogTitle: "",
        isModify: false,
        selectedRow: {}
      }
    },
    created() {
      this.getUserList()
    },
    mounted(){
      //出现滚动条时，表头和下方内容不对齐，重置表格的布局
      setTimeout(()=> {
        this.$refs.userTable.doLayout()
      },1000)
    },
    methods: {
      async getUserList() {
        try {
          const res = await this.$request.get("home/user", this.query)
          if (res.status !== 200) {
            this.$message.error('获取用户数据失败!')
          } else {
            this.userList = res.data
            this.total = res.total
          }
        } catch (err) {
        }
      },
      handleSizeChange(limit) {
        this.query.limit = limit
        this.getUserList()
      },
      handleCurrentChange(page) {
        this.query.page = page
        this.getUserList()
      },
      userStateChange(user) {
        this.$message.success(user.name + "的状态变成了" + user.state)
      },
      async search() {
        const res = await this.$request.get("home/user/search", this.query)
        this.userList = res.data
        this.total = res.total
      },
      closeWindow() {
        this.dialogVisible = false
      },
      clearValidate() {
        //调用孙子组件(addUser.vue)的clearValidate函数
        this.$children[2].$children[0].clearValidate()
      },
      AddUser() {
        this.dialogVisible = true
        this.dialogTitle = "新增用户"
        this.isModify = false
        this.selectedRow = {}
      },
      modifyUserInfo(user) {
        this.dialogVisible = true
        this.dialogTitle = "修改用户资料"
        this.isModify = true
        this.selectedRow = user
      },
      removeUser(){
        this.$confirm('删除操作不可逆，确定删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }

</script>

<style scoped>
  .el-table {
    margin-top: 15px;
  }

  .el-pagination {
    margin-top: 10px;
  }
</style>