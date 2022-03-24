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

Vue.prototype.$currentUser = ''

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



//设置axios请求头加入token
Axios.interceptors.request.use(config => {
    if (config.push === '/') {

    } else {
      if (localStorage.getItem('Authorization')) {
        //在请求头加入token，名字要和后端接收请求头的token名字一样
        config.headers.token=localStorage.getItem('Authorization');
      }
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

//响应回来token是否过期
Axios.interceptors.response.use(response => {
    console.log('响应回来：'+response.data.code)
    //和后端token失效返回码约定403
    if (response.data.code == 403) {
      // 引用elementui message提示框
      ElementUI.Message({
        message: '身份已失效',
        type: 'err'
      });
      //清除token
      localStorage.removeItem('Authorization');
      //跳转
      router.push({name: 'UserLogin'});
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error);
  })
