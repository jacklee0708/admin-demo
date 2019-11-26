<template>
  <div class="login-container">
    <div class="login-box">
      <div class="profile-photo">
        <img src="~assets/img/login/avatar.jpg"/>
      </div>
      <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock"
                    v-model="loginForm.password"
                    type="password"
                    @keyup.enter.native="submitForm('loginForm')">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button type="info" @click="reset('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.login()
          } else {
            return false
          }
        })
      },
      reset(formName) {
        this.$refs[formName].resetFields()
      },
      async login() {
        try {
          const res = await this.$request.get('login', this.loginForm)
          if (res.status !== 200) {
            this.$message.error('登录失败!')
          } else {
            this.$message.success('登录成功~')
            sessionStorage.setItem('token', res.token)
            this.$router.replace('/home')
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    data() {
      return {
        loginForm: {
          username: 'lee',
          password: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入用户密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
  }
</script>

<style scoped>
  .login-container {
    background-color: #f1f1f1;
    height: 100vh;
  }

  .login-box {
    width: 450px;
    height: 300px;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .profile-photo {
    height: 128px;
    width: 128px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }

  .profile-photo img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>