<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/img/login.jpg" alt="">
      </div>
      <!-- 登录界面 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Longin',
    data() {
      return {
        //登录表单登录数据绑定对象
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        //表单验证规则对象
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        this.$refs.loginFormRef.validate( async (valid) => {
          if(valid) {
            const { data: res } = await this.$http.post('login', this.loginForm);
            if(res.meta.status == 200) {
              this.$message.success("登录成功");
              // console.log(res);
              //将登陆后的token保存到sessionStorage中
              window.sessionStorage.setItem('token', res.data.token);
              //通过路由跳转页面
              this.$router.push('/home');
            }else {
              this.$message.error("登录失败");
            }
          }else {
            return
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    bottom: 10px;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
  }
</style>