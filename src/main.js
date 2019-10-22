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
// 导入数据处理包
import JSONbig from 'json-bigint'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入异步请求第三方包
import axios from 'axios'

Vue.use(VueQuillEditor)
Vue.prototype.$http = axios
// 中间件
Vue.use(ElementUI)
// 生产环境配置
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.defaults.transformResponse = [function (data) {
  try {
    // console.log('------------')
    return JSONbig.parse(data)
  } catch (error) {
    // console.log(error)
    return data
  }
}]

// 请求拦截器：发送请求之前执行
axios.interceptors.request.use(function (config) {
  // 获取 token
  let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  // 判断只在 userInfo 存在时，才需要添加 token
  if (userInfo) {
    // 在请求头中添加 token
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // 请求异常时的逻辑
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 当服务器响应信息回来时执行
  // 响应拦截器如果要返回信息，必须 return response
  // return JSONbig.parse(response.data.data)
  console.log(response)
  return response.data.data
}, function (error) {
  // 当响应的状态码 >= 400 时执行   4~~ 客户端错误 5~~ 服务器错误
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
