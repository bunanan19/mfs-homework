// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';

import {router} from './router/router'
Vue.config.productionTip = false
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // data: {
  //   currentRoute: window.location.pathname
  // },
  // computed: {
  //   ViewComponent () {
  //     return routes[this.currentRoute] || NotFound
  //   }
  // },
  // render (h) { return h(this.ViewComponent)}
  router,
  template: `
  <div>
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/user/:id">user</router-link>
    <router-view></router-view>
    <button @click='btnClick'>click me</button>
  </div>`,
  methods: {
    btnClick () {
      router.push({name:'user',params:{id:122},})
    }
  }
})
