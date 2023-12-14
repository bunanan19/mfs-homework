import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import Article from '../pages/Article'
import NotFound from '../pages/NotFound'
import NotFoundArticle from '../pages/NotFoundArticle'
import LogOut from '../pages/LogOut'
import ArticleEdit from '../components/ArticleEdit'
import Admin from '../pages/Admin'
// import { Message } from 'element-ui'

Vue.use(Router)

let router =  new Router({
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
      path: '/article/add',
      name: 'ArticleAdd',
      component: ArticleEdit
    },//路由优先级，先匹配add，在匹配id
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/article/:id/edit',
      name: 'ArticleEdit',
      component: ArticleEdit
    },
    {
      path: '/archive/:year/:month',
      name: 'Archive',
      component: Home
    },
    {
      path: '/tag/:id',
      name: 'Tag',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path:'/not-found-article',
      name: 'NotFound',
      component: NotFoundArticle
    },
    {
      path: '/logout',
      name: 'LogOut',
      component: LogOut
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
router.beforeEach((to,froom,next)=>{
  if (to.name ==='Admin'){
    if(window.localStorage.getItem('userId')){
      next()
    }else {
      next(false)
      // Message.error('对不起，你没有权限访问')
    }
  }else {
    next()
  }
})
export default router
