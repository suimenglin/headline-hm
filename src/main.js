// 导入vue第三方包
import Vue from 'vue'
// 导入根组件App.vue
import App from './App.vue'
// 导入路由模块
import router from './router'
// 导入vuex模块
import store from './store'
// 导入ElementUI包
import ElementUI from 'element-ui'
// 导入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/styles/index.less'
// 中间件
Vue.use(ElementUI)
// 生产环境配置
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
