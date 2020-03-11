// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"// 使用axios请求
import {
  post,
  get,
  deleteUrl,
  patchUrl
} from "./api/http"
import Vant from 'vant';
import 'vant/lib/index.css';
import Header from './common/Header.vue'

Vue.config.productionTip = false

// 导入所有 vant 组件
Vue.use(Vant);

// 注册全局组件
Vue.component("Header", Header)

// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$axios = axios
Vue.prototype.$get = get
Vue.prototype.$delete = deleteUrl
Vue.prototype.$patch = patchUrl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
