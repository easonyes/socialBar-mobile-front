import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    // 当前默认站点
    currentSite: 1,
    // 站点列表
    siteList: [{"text": "主站", "value": 1}],
    // // 默认未认证状态
    // isVerified: 2
  },
  mutations: {
    // 设置当前站点
    setCurrentSite(state, site) {
      state.currentSite = site
    },
    // 设置站点列表
    setSiteList(state, siteList) {
      // console.log(eval(siteList))
      // console.log(typeof siteList)
      // console.log(typeof JSON.parse(JSON.stringify(siteList)))
      // // console.log(JSON.parse(siteList))
      state.siteList = eval(siteList).map(item => {
        item['text'] = item.siteName
        item['value'] = item.id
        console.log(item)
        return item
      })
    },
    changeCurrentSite(state, site) {
      state.currentSite = site
    },
    // // 设置认证状态
    // setStatus(state, status) {
    //   state.isVerified = status
    // },
    add(state) {
      state.count++
    },
    dec(state) {
      state.count--
    }
  },
  actions: {

  },
  getters: {
    showCount: state => {
      return '目前的count等于' + state.count
    }
  }
})

