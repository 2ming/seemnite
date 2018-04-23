<template>
  <transition name="fade">
    <p style="padding: 20px;">退出中...</p>
  </transition>
</template>

<script>
import Cookies from 'universal-cookie'
import config from '../config'

export default {
  beforeMount() {
    this.logOut()
  },
  methods: {
    logOut() {
      const cookies = new Cookies()
      cookies.remove(config.storageNamespace + 'token')
      this.$store.commit('SET_TOKEN', '')
      this.$router.push('/index')
    }
  }
}
</script>
