import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import login from '@/components/Login'
import setPwd from '@/components/setPwd'
import emLogin from '@/components/emLogin'
import home from '@/components/home'
import main from '@/components/main'
import collection from '@/components/collection'
import chat from '@/components/chat'
import chatList from '@/components/chatList'
import mine from '@/components/mine'
import infoEdit from '@/components/info'
import postDetail from '@/components/postDetail'
import postList from '@/components/postList'
import starList from '@/components/starList'
import fanList from '@/components/fanList'
import otherHome from '@/components/otherHome'
import followPosts from '@/components/followPosts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/emLogin"
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
    },
    {
      path: '/infoEdit',
      name: 'infoEdit',
      component: infoEdit
    },
    {
      path: '/postDetail',
      name: 'postDetail',
      component: postDetail
    },
    {
      path: '/postList',
      name: 'postList',
      component: postList
    },
    {
      path: '/starList',
      name: 'starList',
      component: starList
    },
    {
      path: '/fanList',
      name: 'fanList',
      component: fanList
    },
    {
      path: '/otherHome',
      name: 'otherHome',
      component: otherHome
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/main',
          name: 'main',
          component: main,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/chatList',
          name: 'chatList',
          component: chatList
        },
        {
          path: '/followPosts',
          name: 'followPosts',
          component: followPosts
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine
        },
      ]
    }
  ]
})
