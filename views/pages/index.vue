<template>
  <div class="margin-top50">
    <ul class="posts">
        <li @click="goDetails(item._id)" v-for="item in articles" :key="item._id"><span>{{ item.createdAt | timeFormat('yyyy-MM-dd') }}</span> &raquo; <b>{{ item.title }}</b></li>
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
      articles: []
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      seemnite.articles({
        params: this.params
      }).then(res => {
        this.articles = res.list
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

