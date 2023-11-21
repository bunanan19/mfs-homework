import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import Article from '../pages/Article'
import NotFound from '../pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/archive/:year/:month',
      name: 'Archive',
      component: Home
    },
    {
      path: '/target/:id',
      name: 'Target',
      component: Home
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
