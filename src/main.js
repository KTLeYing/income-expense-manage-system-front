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
// import store from '../store/store'

//全局变量axios注册
axios.defaults.baseURL = 'http://localhost:8888/incomeExpense/';  //后端的请求根路径，后面的均基于这个来作为基础路径来请求

// let instance = axios.create({
//   baseURL: 'http://localhost:8888/',
//   timeout: 3 * 1000
// })
//
// instance.interceptors.request.use(config => {
//   config.headers['Authorization'] = localStorage.getItem('Authorization') || ''
//   return config
// })

// 注册element-ui
Vue.use(ElementUI)
//全局变量注册
Vue.prototype.$axios = axios
// Vue.prototype.$instance = instance
Vue.prototype.$qs = qs
// Vue.prototype.$store = store

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//设置axios请求头加入token
Axios.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('Authorization');
    // if (config.push === '/') {
    //
    // } else {
    //   if (localStorage.getItem('Authorization') && config.headers) {
    //     config.headers['Authorization'] = localStorage.getItem('Authorization');
    //   }
    //   //在请求头加入token，名字要和后端接收请求头的token名字一样
    //   config.headers['Authorization'] = localStorage.getItem('Authorization');
    // }
    return config;
  }, error => {
    return Promise.reject(error);
  });

//响应回来token是否过期
Axios.interceptors.response.use(response => {
    console.log('响应回来：'+response.data.code)
    //和后端token失效返回码约定403
    if (response.data.code == 211 || response.data.code == 212 || response.data.code == 213) {
      // 引用elementui message提示框
      ElementUI.Message({
        message: '身份已失效',
        type: 'err'
      });
      //清除token
      localStorage.removeItem('Authorization');
      //跳转到登录页面
      router.push({name: 'UserLogin'});
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error);
  })
