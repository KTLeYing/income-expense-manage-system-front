import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserLogin from "../components/common/UserLogin";
import UserRegister from "../components/common/UserRegister";
import ForgetPassword from "../components/common/ForgetPassword";
import AdminLogin from "../components/manage/AdminLogin";
import Home from "../components/common/Home";

Vue.use(Router)

const router =  new Router({
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
  mode:'history',   //去除#号配置
})

router.beforeEach((to, from, next) => {
  //to到哪儿  from从哪儿离开  next跳转 为空就是放行
  if (to.path === '/') {
    //如果跳转为登录，就放行
    next();
  } else {
    //取出localStorage判断
    let token = localStorage.getItem('Authorization');
    if (token == null || token === '') {
      console.log('请先登录')
      next({name: 'UserLogin'});
    } else {
      next();
    }
  }});

export  default  router;


