// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
//axios.defaults.withCredentials设置为true时axios会发送cookie和HTTP authentication信息给其他域名
//默认情况下，浏览器不允许跨域请求携带cookie,因为这可能会导致敏感信息泄露。
//但是，在某些情况下可能需要发送cookie给其他域名，例如当你的前端应用和后端服务在不同的域名下时
axios.defaults.withCredentials = true

Vue.use(infiniteScroll)
Vue.use(VueMaterial)
// Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.filter('datetime', (data,format = 'YYYY/MM/DD/HH/mm') => {
  return moment(data).format(format)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
