<template>
  <div>
    <form>
      <input v-model="article.title" placeholder="标题" type="text">
      <textarea v-model="article.content" cols="30" rows="10" placeholder="内容"></textarea>
      <button @click="addNews" type="button">保存</button>
    </form>
  </div>
</template>

<script>
import { seemnite } from '../api'

export default {
  data() {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    addNews() {
      seemnite.createArticle({
        data: this.article
      }).then(res => {

      })
    }
  },
  computed: {}
}
</script>

<style lang="less">

</style>

