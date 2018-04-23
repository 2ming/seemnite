<template>
    <div class="padding login" :style="{'background-image': `url(${photos})`}">
        <div class="login-content">
          <p class="login-title">SEEMNITE</p>
          <input class="input" v-model="user.name" type="text" placeholder="请输入用户名" >
          <input class="input" v-model="user.password" type="password" placeholder="请输入密码">
          <button class="btn" type="button" @click="login">登录</button>
        </div>
    </div>
</template>

<script>
import config from '../config'
import Cookies from 'universal-cookie'
import { user } from '../api'

export default {
  data() {
    return {
      user: {},
      photos: ''
    }
  },
  mounted() {
    user.wallpaper().then(res => {
      this.photos = res.data.url
    })
  },
  methods: {
    login() {
      user
        .login({
          data: this.user
        })
        .then(res => {
          let cookies = new Cookies()
          this.$store.commit('SET_TOKEN', res.data.token)
          cookies.set(config.storageNamespace + 'token', res.data.token, {
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
.login{
  background-position: center center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  &-title{
    text-align: center;
    font-size: 40px;
    color: #fff;
    text-shadow: 3px 2px 6px #333333;
  }
  &-content{
    width: 400px;
    height: auto;
    button,
    input{
      padding: 14px;
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
    button{
      background: #2d8cf0;
      color: #fff;
      border: none;
    }
  }
}
</style>

