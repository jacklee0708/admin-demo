<template>
  <div class="user-list">
    <crumb :query="$route.query"></crumb>
    <el-card>
      <tool-bar/>
      <user-table :user-list="userList"/>
      <user-pagination :query="query" :total="total"/>
    </el-card>
    <el-dialog :title="dialogTitle" :visible="dialogVisible" width="30%" center @close="clearValidate">
      <add-user :isModify="isModify" :selectedRow="selectedRow" @closeWindow="closeWindow"/>
    </el-dialog>
  </div>
</template>

<script>
  import Crumb from 'components/Crumb'
  import ToolBar from 'components/ToolBar'
  import UserTable from './UserTable'
  import UserPagination from './UserPagination'
  import AddUser from './AddUser'

  export default {
    name: "userList",
    components: {
      Crumb,
      ToolBar,
      UserTable,
      UserPagination,
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
    mounted() {
      //toolbar组件的搜索框被清空时,先重置query中的page，再重新请求数据
      this.$bus.$on('inputClear', () => {
        this.query.page = 1
        this.getUserList()
      })
      //toolbar组件的搜索被触发,把传过来的搜索内容赋值给query中的name
      this.$bus.$on('search', searchVal => {
        this.query.name = searchVal
        this.getUserList()
        this.$message.success('搜索成功，此处为演示')
      })
      //toolbar组件的add按钮被点击
      this.$bus.$on('add', () => {
        this.addUser()
      })
      //usertable组件的修改按钮被点击
      this.$bus.$on('modifyUserInfo', data => {
        this.modifyUserInfo(data)
      })
      //usertable组件的limit发生改变
      this.$bus.$on('limitChange', limit => {
        this.query.limit = limit
        this.getUserList()
      })
      //usertable组件的page发生改变
      this.$bus.$on('pageChange', page => {
        this.query.page = page
        this.getUserList()
      })
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
      userStateChange(user) {
        this.$message.success(user.name + "的状态变成了" + user.state)
      },
      closeWindow() {
        this.dialogVisible = false
      },
      clearValidate() {
        //清除组件addUser的表单验证
        this.$bus.$emit("clearValidate")
      },
      addUser() {
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