// 导入Vue第三方包
import Vue from 'vue'
// 导入路由第三方包
import Router from 'vue-router'
// 导入主页面和登陆组件
import Home from './views/home'
import Login from './views/login'
// 导入布局组件
import Layout from './views/layout'
import Publish from './views/publish'

Vue.use(Router)

const router = new Router({
  routes: [
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
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.path !== '/login') {
    let userinfo = window.localStorage.getItem('userInfo')
    if (!userinfo) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
// 输出路由实例
export default router
