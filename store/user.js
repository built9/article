import { http } from '../plugins/axios'

const state = () => ({
  token: '',
  id: '',
  email: '',
  nickname: '',
  avatar: ''
})

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER(state, user) {
    state.id = user._id
    state.email = user.email
    state.nickname = user.nickname
    state.avatar = user.avatar
  }
}
const actions = {
  login: async ({ state, commit }, data) => {
    const ret = await http.post('/user/login', data)
    if (ret.code === 0) {
      commit('SET_TOKEN', ret.data.token)
    }
    return ret
  },
  detail: async ({ state, commit }, data) => {
    const ret = await http.post('/user/detail')
    if (ret.code === 0) {
      commit('SET_USER', ret.data)
      return ret
    }
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
