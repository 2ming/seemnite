<template>
  <div>
    <h1>{{details.title}}</h1>
    <div>
      {{details.content}}
    </div>
  </div>
</template>

<script>
import { seemnite } from '../api'

export default {
  data() {
    return {
      details: {},
      id: this.$route.params.id
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      seemnite.articleDetail({}, this.id).then(res => {
        this.details = res
      })
    }
  }
}
</script>

<style lang="less">

</style>

