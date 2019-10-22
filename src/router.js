// 导入Vue第三方包
import Vue from 'vue'
// 导入路由第三方包
import Router from 'vue-router'
// 导入主页面和登陆组件
import Home from '@/views/home'
import Login from '@/views/login'
// 导入布局组件
import Layout from '@/views/layout'
import Publish from '@/views/article/publish'
// 导入list组件
import List from '@/views/article/list'
// 导入评论列表组件
import Comment from '@/views/comment'
import Material from '@/views/material'
import User from '@/views/user'
// 导入进度条第三方包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({ // $router路由对象
  routes: [// $route:当前路由的一些规则
    // 一级路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      // 二级路由
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/article/publish', // 发表文章
          name: 'publish',
          component: Publish
        },
        {
          path: '/article/edit/:id', // 发表文章
          name: 'edit',
          component: Publish
        },
        // 设置list规则
        {
          path: '/article/list', // 文章列表
          name: 'list',
          component: List
        },
        {
          path: '/comment/list',
          name: 'commentList',
          component: Comment
        },
        {
          path: '/material/list',
          name: 'materialList',
          component: Material
        },
        {
          path: '/user/center',
          name: 'userinfo',
          component: User
        }
      ]
    }
  ]
})
// 消除两次跳转相同路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 导航守卫：前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  NProgress.start()
  if (to.path !== '/login') {
    let userinfo = window.localStorage.getItem('userInfo')
    if (!userinfo) {
      // 这里的this不是指向window，指向的是vue的运行环境
      console.log(this)
      // this.$router.push('/login')
      // 1.在执行Vue.use(Router)时给vue的实例的原型定义了$router
      // this.$router中的this指向vue实例，一般用于xx.vue 的实例中
      // 2.这里的this处于箭头函数中，根据语法规则知不会指向router，注意也不是指向Window，而是指向是vue的运行环境
      router.push('/login')
    } else {
      // console.log(this)
      next()
    }
  } else {
    // console.log(this)
    next()
  }
})
// 导航守卫：后置钩子
router.afterEach((to, from) => {
  NProgress.done()
})

// 输出路由实例
export default router
