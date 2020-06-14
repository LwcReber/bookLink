import { login } from '@/api'
import { getUseInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLogin: !!localStorage.getItem('token'),
    userName: '',
    userId: '', // 用户id
    avatar: '' // 头像
  },
  mutations: {
    setLoginState (state, val) {
      state.isLogin = val
    },
    setUserInfo (state, user) {
      console.log('suer')
      user.name && (state.userName = user.name)
      user.id && (state.userId = user.id)
      user.avatar && (state.avatar = user.avatar)
    }
  },
  actions: {
    getUseInfo ({ commit, state, dispatch }) {
      if (state.isLogin && !state.userId) {
        return getUseInfo().then(({ code, data }) => {
          commit('setUserInfo', data)
        }).catch(() => {
          console.log('cathc')
          dispatch('clearUserData')
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
    clearUserData ({ commit }) {
      commit('setLoginState', false)
      removeToken()
      // 清空用户数据
      commit('setUserInfo', { name: '', avatar: '' })
    },
    logout ({ dispatch }) {
      dispatch('clearUserData')
      router.push('/login')
    }
  }
}
