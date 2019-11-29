<template>
  <div>
    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="addForm.name" clearable :disabled="isModify"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="account" v-if="!isModify">
        <el-input v-model="addForm.account" clearable></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="secret" v-if="!isModify">
        <el-input v-model="addForm.secret" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属角色" prop="role" width="100px">
        <el-select v-model="addForm.role" placeholder="所属角色" class="el-input">
          <el-option label="普通用户" value="普通用户"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="超级管理员" value="超级管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="addForm.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email" clearable></el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddUser",
    props: {
      dialogVisible: {
        type: Boolean,
        default() {
          return false
        }
      },
      isModify: {
        type: Boolean,
        default() {
          return false
        }
      },
      selectedRow: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      const checkPhone = (rule, value, cb) => {
        const regPhone = /^1[3456789]\d{9}$/
        if (regPhone.test(value)) {
          return cb()
        } else {
          cb("请输入正确的手机号码")
        }
      }
      const checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (regEmail.test(value)) {
          return cb()
        } else {
          cb("请输入正确的邮箱地址")
        }
      }

      const checkRepeat = (rule, value, cb) => {
        if (value !== 'admin') {
          return cb()
        } else {
          cb("账号已存在")
        }
      }
      return {
        addForm: this.isModify ? this.selectedRow : {},
        rules: {
          name: [
            {required: true, message: '请输入员工姓名', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'},
            {validator: checkRepeat, trigger: 'blur'}
          ],
          secret: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '为员工分配一个角色', trigger: 'blur'}
          ],
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      selectedRow: function (newVal) {
        this.addForm = newVal
      }
    },
    methods: {
      cancel() {
        this.$emit("closeWindow")
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$emit("closeWindow")
            if(this.isModify){
              this.$message.success("修改成功")
            }else{
              this.$message.success("新增成功")
            }
          } else {
            return false
          }
        })
      },
      clearValidate() {
        this.$refs.addForm.clearValidate()
      }
    }
  }
</script>

<style scoped>
  .footer {
    text-align: right;
  }
</style>