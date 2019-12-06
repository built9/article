<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" class="login-form">
      <div class="title-container">
        <img src="/favicon.ico" alt="" />
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"></i>
        </span>
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="邮箱"
          name="email"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="输入密码"
          name="password"
        ></el-input>
      </el-form-item>
      <el-button
        @click.native.prevent="handleLogin"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  data() {
    return {
      form: {
        email: '771524005@qq.com',
        password: '12345678'
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            email: this.form.email,
            password: md5(this.form.password)
          }
          const ret = await this.$store.dispatch('user/login', obj)
          if (ret.code === 0) {
            this.$notify({
              title: '登录成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1500)
          } else {
            this.$notify({
              title: '登录失败',
              type: 'success',
              message: ret.message
            })
          }
        }
      })
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
