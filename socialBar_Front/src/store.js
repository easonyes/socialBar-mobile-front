import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    // 当前默认站点
    currentSite: Number(localStorage.getItem('currentSite')),
    // // 站点列表
    // siteList: [{"text": "主站", "value": 1}],
    // tab选中值
    bottomTab: 'main',
    // 主页上部索引栏
    topTab: '0',
    // 首次访问推荐
    firstIn0: true,
    // 首次访问热门
    firstIn1: true,
    // 首次访问实时
    firstIn2: true
    // // 默认未认证状态
    // isVerified: 2
  },
  mutations: {
    // 再次访问设置
    secondIn(state, index) {
      switch(index) {
        case 0:
          state.firstIn0 = false
          break
        case 1:
          state.firstIn1 = false
          break
        case 2:
          state.firstIn2 = false
      }
    },
    // 设置主页上部索引栏
    setTopTab(state, tab) {
      state.topTab = tab
    },
    // 设置底部标签值
    setBottomTab(state, tab) {
      state.bottomTab = tab
    },
    // 设置当前站点
    setCurrentSite(state, site) {
      state.currentSite = site
    },
    // 设置站点列表
    // setSiteList(state, siteList) {
    //   // console.log(eval(siteList))
    //   // console.log(typeof siteList)
    //   // console.log(typeof JSON.parse(JSON.stringify(siteList)))
    //   // // console.log(JSON.parse(siteList))
    //   state.siteList = eval(siteList).map(item => {
    //     item['text'] = item.siteName
    //     item['value'] = item.id
    //     console.log(item)
    //     return item
    //   })
    // },
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

