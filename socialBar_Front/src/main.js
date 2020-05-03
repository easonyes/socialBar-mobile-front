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
import validate from "../src/commonJs/validate.js"
import Vant from 'vant';
import 'vant/lib/index.css';
import Header from './common/Header.vue'
import CodeBox from './common/CodeBox.vue'
import postBox from './common/postBox.vue'
import vconsole from 'vconsole'
import VueCropper from 'vue-cropper'
import { Notify, Dialog } from 'vant'
import store from './store'

Vue.config.productionTip = false

// 导入所有 vant 组件
Vue.use(Vant);
Vue.use(VueCropper)
Vue.use(Notify);
Vue.use(Dialog);

// 注册全局组件
Vue.component("Header", Header)
Vue.component("CodeBox", CodeBox)
Vue.component("postBox", postBox)

// 定义全局变量
Vue.prototype.$vconsole = new vconsole()
Vue.prototype.$post = post
Vue.prototype.$axios = axios
Vue.prototype.$get = get
Vue.prototype.$delete = deleteUrl
Vue.prototype.$patch = patchUrl
Vue.prototype.$validate = validate

Vue.prototype.$mess = function(res) {
  if (res.success) {
    this.$toast.success(res.result)
  } else {
    this.$toast.fail(res.result)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
