<template>
  <div>
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="0">
            <img class="logo" src="/favicon.ico" alt="" />
          </el-menu-item>
          <el-menu-item index="1">
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>

          <el-menu-item v-if="userinfo.id" index="3" class="pull-right">
            <nuxt-link to="/user">退出</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="userinfo.id" index="4" class="pull-right">
            <nuxt-link to="/user">{{ userinfo.nickname }}</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="userinfo.id" index="4" class="pull-right">
            <nuxt-link to="/editor/new">
              <el-button type="primary">写文章</el-button>
            </nuxt-link>
          </el-menu-item>

          <el-menu-item v-if="!userinfo.id" index="2" class="pull-right">
            <nuxt-link to="/register">注册</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userinfo.id" index="3" class="pull-right">
            <nuxt-link to="/login">登录</nuxt-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      <el-footer>
        底部
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  computed: {
    userinfo() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const token = localStorage.getItem('BLOG_USER_TOKEN')
      if (token) {
        this.$store.dispatch('user/detail')
      }
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #eee;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
a {
  text-decoration: none;
}
.pull-right {
  float: right !important;
}
.logo {
  height: 37px;
}
.blog-container {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
}
</style>
