import { login } from '@/api'
import { getUseInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLogin: !!localStorage.getItem('token'),
    userName: '',
    avatar: '' // 头像
  },
  mutations: {
    setLoginState (state, val) {
      state.isLogin = val
    },
    setUserInfo (state, user) {
      state.userName = user.name
      state.avatar = user.avatar
    }
  },
  actions: {
    getUseInfo ({ commit, state }) {
      if (state.isLogin) {
        return getUseInfo().then(({ code, data }) => {
          commit('setUserInfo', data)
        })
      }
    },
    login ({ commit }, userInfo) {
      return login(userInfo).then(({ code, data }) => {
        const token = data.token
        if (token) {
          // 登录成功
          commit('setLoginState', true)
          setToken(token)
          return true
        }
        return false
      })
    },
    logout ({ commit }) {
      commit('setLoginState', false)
      removeToken()
      router.push('/login')
    }
  }
}
