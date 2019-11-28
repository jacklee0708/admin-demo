<template>
  <div class="staff-list">
    <crumb :query="$route.query"></crumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="query.name" clearable @clear="getStaffList"
                    @keyup.enter.native="search">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">员工入职</el-button>
        </el-col>
      </el-row>
      <el-table :data="staffList" style="width: 100%" stripe border>
        <el-table-column type="index"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="role" label="角色"/>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="staffStateChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" center @close="resetWindow">
      <add-staff :dialogVisible="dialogVisible" @closeWindow="closeWindow"/>
    </el-dialog>
  </div>
</template>

<script>
  import Crumb from 'components/Crumb'
  import AddStaff from './AddStaff'

  export default {
    name: "StaffList",
    components: {
      Crumb,
      AddStaff
    },
    data() {
      return {
        query: {
          page: 1,
          limit: 10,
          name: ''
        },
        staffList: [],
        total: 0,
        dialogVisible: false
      }
    },
    created() {
      this.getStaffList()
    },
    methods: {
      async getStaffList() {
        try {
          const res = await this.$request.get("home/staff", this.query)
          if (res.status !== 200) {
            this.$message.error('获取用户数据失败!')
          } else {
            this.$message.success('数据均为随机生成，不具有真实性')
            this.staffList = res.data
            this.total = res.total
          }
        } catch (err) {
        }
      },
      handleSizeChange(limit) {
        this.query.limit = limit
        this.getStaffList()
      },
      handleCurrentChange(page) {
        this.query.page = page
        this.getStaffList()
      },
      staffStateChange(staff) {
        this.$message.success(staff.name + "的状态变成了" + staff.state)
      },
      async search() {
        console.log(this.query.name);
        const res = await this.$request.get("home/staff/search", this.query)
        this.staffList = res.data
        this.total = res.total
      },
      closeWindow() {
        this.dialogVisible = false
      },
      resetWindow(){
        this.$children[2].$children[0].resetWindow()
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