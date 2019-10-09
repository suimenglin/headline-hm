// 导入Vue第三方包
import Vue from 'vue'
// 导入路由第三方包
import Router from 'vue-router'
// 导入主页面和登陆组件
import Home from './views/home'
import Login from './views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
