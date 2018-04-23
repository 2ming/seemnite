<template>
  <div class="padding">
    <div class="title">{{details.title}}<span class="time"> 日期：{{details.createdAt | timeFormat('yyyy-MM-dd')}}</span></div>
    <div>
      标签：
      <span v-for="tag in details.tags" :key="tag.id">{{tag.name}}</span>
    </div>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked, { Renderer } from 'marked'
import hljs from 'highlight.js'
import { seemnite } from '../api'

export default {
  data() {
    return {
      details: {
        content: ''
      },
      id: this.$route.params.id
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    this.getDetails()
  },
  computed: {
    compiledMarkdown() {
      return marked(this.details.content, { sanitize: true })
    }
  },
  methods: {
    getDetails() {
      seemnite.articleDetail({}, this.id).then(res => {
        this.details = res.data
      })
    }
  }
}
</script>

<style lang="less">
  .padding{
    padding: 20px 50px 20px 20px;
  }
</style>

