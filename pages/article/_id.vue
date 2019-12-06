<template>
  <div class="blog-container">
    <UserDisplay :user="article.author">
      <el-button v-if="isFllow" @click="cancelFollow" type="success"
        >已关注</el-button
      >
      <el-button v-else @click="follow">关注</el-button>
    </UserDisplay>
  </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'
export default {
  components: { UserDisplay },
  data() {
    return {
      isFllow: false,
      article: {
        title: '',
        author: {}
      }
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.id = id
    this.getArticle()

    const token = localStorage.getItem('BLOG_USER_TOKEN')
    this.token = token
  },
  methods: {
    async getArticle() {
      const ret = await this.$http.get('/article/' + this.id)
      this.article = ret.data
      if (this.token) {
        this.checkFollowStatus()
      }
    },
    async checkFollowStatus() {
      const isFllow = await this.$http.get(
        '/user/follow/' + this.article.author._id
      )
      if (isFllow.code === 0) {
        this.isFllow = isFllow.data.isFollow
      }
    },
    async follow() {
      await this.$http.put('/user/follow/' + this.article.author._id)
      this.checkFollowStatus()
    },
    async cancelFollow() {
      await this.$http.delete('/user/follow/' + this.article.author._id)
      this.checkFollowStatus()
    }
  }
}
</script>

<style></style>
