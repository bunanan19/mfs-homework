import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建一个新的 store 实例
export const store =  new Vuex.Store({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    click (state) {
      state.count++
    }
  }
})