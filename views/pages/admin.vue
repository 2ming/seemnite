<template>
  <div>
    <div class="admin-top">
      <div class="admin-top-item">
        <input type="text" placeholder="请输入标题" v-model="title">
      </div>
      <div class="admin-top-item">
        <input type="text" placeholder="请输入tags,多个tag以','分割" v-model="tags">
      </div>
      <div class="admin-top-item width-80">
        <button type="button" @click="addNews">保存</button>
      </div>
    </div>
    <div class="containers">
      <div class="container">
        <textarea class="pane" :value="source" @input="update($event)"></textarea>
      </div>
      <div class="container">
        <div class="pane" v-html="compiledMarkdown"></div>
      </div>
    </div>
    
  </div>
  
</template>

<script>
import marked, { Renderer } from 'marked'
import hljs from 'highlight.js'
import { debounce } from 'lodash'
import { seemnite } from '../api'

export default {
  data() {
    return {
      source: '',
      title: '',
      tags: ''
    }
  },
  components: {},
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
  },
  computed: {
    compiledMarkdown() {
      return marked(this.source, { sanitize: true })
    }
  },
  methods: {
    update: debounce(function(e) {
      this.source = e.target.value
    }, 300),
    addNews() {
      seemnite
        .createArticle({
          data: {title: this.title, tags: this.tags.split(','), content: this.source}
        })
        .then(res => {
          this.$router.push({
            path: '/index'
          })
        })
    }
  }
}
</script>

<style lang="less">

.admin-top{
  display: flex;
  background: #efefef;
  padding: 10px;
  button{
    height: 40px;
    width: 100%;
    padding: 0 20px;
    background-color: #2d8cf0;
    border-radius: 3px;
    border: 1px solid #2d8cf0;
    color: #fff;
  }
  input{
    width: 100%;
    border-radius: 3px;
    border: 1px solid #ccc;
    height: 40px;
    padding: 4px 10px;
  }
  .width-80{
    flex-basis: 80px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  &-item {
    padding: 0 10px;
    flex-grow: 1;
    flex-shrink: 1;
  }
}
.containers {
  display: flex;
  height: calc(100vh - 68px);
}

.container {
  flex-basis: 50%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.pane {
  margin-top: 5px;
  padding: 0.6em;
  border: 1px solid #ccc;
  overflow: auto;
  flex-grow: 1;
  flex-shrink: 1;
}
.item-editor {
  width: 100%;
  height: 700px;
}
</style>

