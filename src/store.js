import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    changeUserMsg (state, msg) {
      state.userInfo.name = msg.name
      state.userInfo.intro = msg.intro
      state.userInfo.email = msg.email
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    changeUserImg (state, img) {
      state.userInfo.photo = img
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    setuserInfo (state, userInfo) {
      state.userInfo = userInfo
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  actions: {

  }
})
