<template>
  <div class="author-side">
    <p><img src="//2ming.github.com/images/2160347.jpg" alt="ming" /></p>
    <h3>Ming</h3>
    <p class="story"> a about xiaoming story</p>
    <p><a target="_blank" href="http://github.com/2ming">Github</a></p>
    <p>E:421543076@qq.com</p>
    <p>Q:421543076</p>
    <button v-show="token" class="btn" type="button" @click="logout">退出</button>
    <!-- <div v-if="token"></div> -->
  </div>
</template>
<script>
// import { user } from '../api'

export default {
  name: 'AuthorSide',
  data() {
    return {
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    logout() {
      this.$router.push('/logout')
    }
  }
}
</script>
<style lang="less">

</style>
