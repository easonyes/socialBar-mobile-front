import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import login from '@/components/Login'
import setPwd from '@/components/setPwd'
import emLogin from '@/components/emLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/setPwd',
      name: 'setPwd',
      component: setPwd
    },
    {
      path: '/emLogin',
      name: 'emLogin',
      component: emLogin
    }
  ]
})
