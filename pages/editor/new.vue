<template>
  <div>
    <div class="write-btn">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <textarea :value="content" @input="update" class="md-editor"></textarea>
      </el-col>
      <el-col :span="12">
        <div v-html="compiledMarkdown" class="markdown-body"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked'
export default {
  layout: 'login',
  head: {
    link: [
      {
        href:
          'https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css',
        rel: 'stylesheet'
      }
    ]
  },
  data() {
    return {
      content: '# node.js'
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitize: true })
    }
  },
  methods: {
    update: debounce(function(e) {
      this.content = e.target.value
    }, 150),
    async submit() {
      const ret = await this.$http.post('/article/create', {
        content: this.content
      })
      if (ret.code === 0) {
        this.$notify({
          title: '创建成功',
          type: 'success',
          message: `文章《${ret.data.title}》创建成功`
        })
        setTimeout(() => {
          this.$router.push({ path: '/article/' + ret.data.id })
        })
      }
    }
  }
}
</script>

<style scoped>
.md-editor {
  width: 100%;
  height: 100vh;
  outline: none;
}
.write-btn {
  position: fixed;
  z-index: 100;
  right: 30px;
  top: 10px;
}
</style>
