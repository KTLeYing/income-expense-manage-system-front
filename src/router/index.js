import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserLogin from "../components/common/UserLogin";
import UserRegister from "../components/common/UserRegister";
import ForgetPassword from "../components/common/ForgetPassword";
import AdminLogin from "../components/common/AdminLogin";
import Home from "../components/common/Home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/userRegister',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/adminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ],
  mode:'history'   //去除#号配置
})
