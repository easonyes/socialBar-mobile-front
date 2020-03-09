import Vue from "vue"
import axios from "axios"

// import { log } from "util"
// import { trimExt } from 'upath';
axios.defaults.timeout = 500000
axios.defaults.header = "Access-Control-Allow-Origin"
// axios.defaults.baseURL = "/test"
// axios.defaults.baseURL = "/api"
axios.defaults.baseURL = ""
let loadingInstance
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // console.log("前", config)
  let q = config.url.split("/").pop()
//   if (q.indexOf("save") != "-1" || q.indexOf("add") != "-1" || q.indexOf("manualAssign") != "-1" || q.indexOf("check") != "-1" || q.indexOf("reject") != "-1") {
//     loadingInstance = Loading.service({
//       lock: true,
//       text: "努力加载中...",
//       spinner: "el-icon-loading",
//       background: "rgba(0, 0, 0, 0.7)"
//     })
//   }
  // 在发送请求之前做些什么
//   if (config.url == "/static/menuData.json") {
//     config.baseURL = ""
//     config.url = "/static/menuData.json"
//   }
  return config
}, function(error) {
  // 对请求错误做些什么
//   Message({
//     message: "系统异常",
//     type: "warning"
//   })
  if (loadingInstance) { loadingInstance.close() }
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // if (response.request.responseURL.indexOf("login.html?") < 0) {
  //   Message({
  //     message: "用户登录超时，请重新登录",
  //     type: "warning"
  //   })
  //   location.href = "/"
  // }
  // console.log(loadingInstance)
  if (loadingInstance) {
    loadingInstance.close()
  }
  return response
}, function(error) {
  // 对响应错误做点什么
  if (loadingInstance) {
    loadingInstance.close()
  }
  return Promise.reject(error)
})

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleteUrl(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patchUrl(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
