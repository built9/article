<template>
  <div class="blog-container">
    <h1>文章</h1>
    <div v-for="article in articles">
      <nuxt-link :to="'/article/' + article._id">
        {{ article.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  async asyncData({ app }) {
    const ret = await app.$axios.get('/api/article')
    return {
      articles: ret.data.data
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
