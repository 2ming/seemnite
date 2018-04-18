<template>
  <div class="padding">
    <form>
      <input v-model="user.name" type="text" placeholder="请输入用户名">
      <input v-model="user.password" type="password" placeholder="请输入密码">
      <button type="button" @click="login">登录</button>
    </form>
  </div>
</template>

<script>
import config from '../config'
import Cookies from 'universal-cookie'
import { user } from '../api'

export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    console.log(this.$route.params.redirect)
  },
  methods: {
    login() {
      user
        .login({
          data: this.user
        })
        .then(res => {
          let cookies = new Cookies()
          debugger
          this.$store.commit('SET_TOKEN', res.token)
          cookies.set(config.storageNamespace + 'token', res.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 31
          })
          this.$router.push({
            path: '/admin',
            redirect: this.$route.params.redirect
          })
        })
    }
  }
}
</script>

<style lang="less">
.padding {
  padding: 20px 50px 20px 20px;
}
</style>

