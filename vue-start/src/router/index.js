import Vue from 'vue'
import Router from 'vue-router'
import BtnGroup from '@/components/BtnGroup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BtnGroup',
      component: BtnGroup
    }
  ]
})
