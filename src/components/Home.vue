<template>
  <div>
    <el-button type="info" @click="logOut">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    methods: {
      logOut() {
        window.sessionStorage.clear(); //清空token
        this.$router.push('/login'); //跳转到登录页
      }
    },
  }
</script>

<style lang="less" scope>
  
</style>