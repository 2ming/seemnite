<template>
  <div class="main">
    <Author-side></Author-side>
    <div class="site">
      <Nav></Nav>
      <router-view class="view"></router-view>
    </div> 
  </div>
</template>
<script>
import Nav from '../components/Nav.vue'
import AuthorSide from '../components/AuthorSide.vue'

export default {
  components: {
    Nav,
    AuthorSide
  }
}
</script>
<style lang="less">

</style>
