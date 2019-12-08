<template>
  <div class="blog-container">
    <UserDisplay :user="article.author">
      <el-button v-if="isFollow" @click="cancelFollow" type="success"
        >已关注</el-button
      >
      <el-button v-else @click="follow">关注</el-button>
    </UserDisplay>

    <el-divider></el-divider>
    <div v-html="article.article_html" class="article"></div>

    <el-divider></el-divider>

    <el-button @click="likeAction" :type="likeStatus ? 'success' : 'info'">
      <i class="el-icon-thumb">{{ article.like }}</i>
    </el-button>
    <el-button>
      <i class="el-icon-thumb rotate">0</i>
    </el-button>
  </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'
export default {
  components: { UserDisplay },
  data() {
    return {
      isFollow: false,
      likeStatus: false,
      dislikeStatus: false,
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
    async getLikeStatus() {
      const ret = await this.$http.get('/user/article/' + this.id)
      if (ret.code === 0) {
        this.likeStatus = ret.data.like
        this.dislikeStatus = ret.data.dislike
      }
    },
    async likeAction() {
      const type = this.likeStatus ? 'delete' : 'put'
      const ret = await this.$http[type]('/user/likeArticle/' + this.id)
      if (ret.code === 0) {
        this.getArticle()
        this.$notify({
          title: ret.message,
          type: 'success'
        })
      }
    },
    async getArticle() {
      const ret = await this.$http.get('/article/' + this.id)
      this.article = ret.data
      if (this.token) {
        this.checkFollowStatus()
        this.getLikeStatus()
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

<style>
.article {
  padding: 10px;
}
.rotate {
  transform: rotate(180deg);
}
</style>
