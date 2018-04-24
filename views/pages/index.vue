<template>
  <div class="margin-top50">
    <ul class="posts">
        <li v-for="(item, index) in articles" :key="item._id">
          <button class="btn" v-if="token" type="button" @click.stop="editArticle(item._id)">编辑</button>
          <button class="btn" v-if="token" type="button" @click.stop="delArticle(item._id, index)">删除</button>
          <span>{{ item.createdAt | timeFormat('yyyy-MM-dd') }}</span> &raquo; <b @click="goDetails(item._id)">{{ item.title }}</b>
        </li>
    </ul>
  </div>
</template>

<script>
import { seemnite } from '../api'
export default {
  data() {
    return {
      params: {
        page_index: 1,
        page_size: 30
      },
      articles: [],
      token: this.$store.state.token
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    delArticle(id, index) {
      seemnite.deleteArticle({}, id).then(res => {
        if (res.success) {
          this.articles.splice(index, 1)
        }
      })
    },
    editArticle(id) {
      this.$router.push({
        path: '/admin',
        query: {id}
      })
    },
    list() {
      seemnite.articles({
        params: this.params
      }).then(res => {
        this.articles = res.data.list
      })
    },
    goDetails(id) {
      this.$router.push({
        path: `/details/${id}`
      })
    }
  },
  computed: {}
}
</script>

<style lang="less">
.posts{
  li{
    cursor: pointer;
    b{
      color: #2d8cf0;
    }
  }
}
.margin-top50{
  margin-top: 50px;
}
</style>

