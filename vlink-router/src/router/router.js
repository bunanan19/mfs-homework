import VueRouter from 'vue-router';
import NotFound from '../components/NotFound'
import Home from '../components/Home'
import About from '../components/About'
import User from '../components/User'

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {name: "user", path:'/user/:id',component:User},
    {path: '*',component: NotFound}
  ]
  
  export const router = new VueRouter({
    mode: 'history',
    routes
  })
  