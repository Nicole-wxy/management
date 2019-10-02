import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//mutation类型
const SET_AUTHORIZATION = 'SET_AUTHORIZATION'
const SET_USER = 'SET_USER'

export default new Vuex.Store({
  state: {
    isAuthorization: false,
    user: {}
  },
  //计算
  getters: {
    isAuthorization: state => state.isAuthorization,
    user: state => state.user
  },
  //提交
  mutations: {
    [SET_AUTHORIZATION](state, isAuthorization) {
      if (isAuthorization) state.isAuthorization = isAuthorization
      else state.isAuthorization = false
    },
    [SET_USER](state, user) {
      if (user) state.user = user
      else state.user = {}
    }
  },
  //异步
  actions: {
    setAuthorization: ({ commit }, isAuthorization) => {
      commit(SET_AUTHORIZATION, isAuthorization)
    },
    setUser: ({ commit }, user) => {
      commit(SET_USER, user)
    },
    clearCurrent: ({ commit }) => {
      commit(SET_AUTHORIZATION, false)
      commit(SET_USER, null)
    }
  }
})
