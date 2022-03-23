// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import $ from 'jquery'
import qs from 'qs'

//全局变量axios注册
axios.defaults.baseURL = 'http://localhost:8888/incomeExpense/';  //后端的请求根路径，后面的均基于这个来作为基础路径来请求
// 注册element-ui
Vue.use(ElementUI)
//全局变量注册
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
