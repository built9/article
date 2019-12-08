<template>
  <div class="blog-container">
    <h1>用户中心</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="关注" name="following">
        <div v-for="f in following" :key="f._id">
          <UserDisplay :user="f"></UserDisplay>
        </div>
      </el-tab-pane>
      <el-tab-pane label="粉丝" name="followers">
        <div v-for="f in followers" :key="f._id">
          <UserDisplay :user="f"></UserDisplay>
        </div>
        <div v-if="!followers.length">
          无数据
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'

export default {
  components: { UserDisplay },
  data() {
    return {
      activeName: 'following',
      followers: [],
      following: []
    }
  },
  mounted() {
    const userid = this.$route.params.id
    this.userid = userid
    this.loadFollowing()
    this.loadFollowers()
  },
  methods: {
    async loadFollowing() {
      const ret = await this.$http.get('/user/' + this.userid + '/following')
      if (ret.code === 0) {
        this.following = ret.data
      }
    },
    async loadFollowers() {
      const ret = await this.$http.get('/user/' + this.userid + '/followers')
      if (ret.code === 0) {
        this.followers = ret.data
      }
    }
  }
}
</script>

<style scoped></style>
