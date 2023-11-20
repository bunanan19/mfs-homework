import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      clickTimes0: 0,
      clickTimes1: 0,
      data: {}
    },
    mutations: {
      click (state, index) {
        // 变更状态
        state['clickTimes'+index]++
      },
      addNews (state, data) {
        state.data = data
      }
    },//必须是同步函数
    // actions: {
    //   async getNews ({commit}) {
    //     let {data} = await axios.get('')
    //     commit('addNews',data)
    //   }
    // },//Action 类似于 mutation,但Action 可以包含任意异步操作。通过 store.dispatch 方法触发
    getters: {
      clickSum (state) {
        return state.clickTimes0 + state.clickTimes1
      }
    }
  })

//   store.commit('increment');
//   console.log(store.state.count)
