import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'
const service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})
const TOKEN_KEY = 'BLOG_USER_TOKEN'
export default ({ store, redirect }) => {
  service.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem(TOKEN_KEY)
      if (token) {
        config.headers.common.Authorization = 'Bearer ' + token
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  service.interceptors.response.use(
    (response) => {
      const { data, config } = response
      if (data.code === 0) {
        if (config.url === '/api/user/login') {
          localStorage.setItem(TOKEN_KEY, data.data.token)
        }
      } else if (data.code === -666) {
        MessageBox.confirm('登录过期了', '过期', {
          confirmButtonText: '登录',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          localStorage.removeItem(TOKEN_KEY)
          redirect({ path: '/login' })
        })
      }
      return data
    },
    (err) => {
      return Promise.reject(err)
    }
  )
}
Vue.prototype.$http = service
export const http = service
