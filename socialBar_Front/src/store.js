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
    firstIn2: true,
    chatToUser:{}, //要聊天的对象的信息，包括user_id、username、avator_url
    historyMsg: [], //历史聊天记录
    messagePush: null, //消息推送
    group_name: '', //当前聊天组的组名
    unreadMsgLength: 0, //未读消息数量
  },
  mutations: {
    //减少未读信息的数量
    reduceUnreadMsg(state, num) {
      state.unreadMsgLength-=num
    },
    //页面刷新后恢复未读信息数量
    recoverUnreadMsgLength(state, l) {
      state.unreadMsgLength = l
    },

    //消息推送错误
    messagePushOnError(state, channel) {
      state.messagePush.onerror = (e) => {
        console.log(`消息推送连接失败的信息：${e}`)
      }
    },

    //消息推送断开连接
    messagePushOnClose(state) {
      state.messagePush.onclose = (e) => {
        console.log('消息推送断开连接')
      }
    },

    //关闭消息推送
    closeMessagePush(state) {
      state.messagePush.close()
    },
    //初始化消息推送
    initMessagePush(state, channel) {
      console.log('channel2', channel)
      state.messagePush = new WebSocket(channel)
      state.messagePush.onopen = () => {
        console.log('消息推送开启')
      }
    },
    //将某个用户发来的信息设为已读状态
    changeReadState(state, name) {
      for(let i in state.historyMsg) {
        if(state.historyMsg[i].username == name) {
          state.historyMsg[i].unreadCount = 0
          break
        }
      }
    },

    //清空消息记录
    clearMsgRecord(state) {
      state.historyMsg = []
      state.unreadMsgLength = 0
    },
    //页面刷新后恢复历史消息
    recoverHistoryMsg(state, m) {
      state.historyMsg = m
    },
    //消息推送接收数据
    messagePushOnMessage(state) {
      console.log(state.messagePush)
      state.messagePush.onmessage = (e) => {
        //未读消息数加一
        console.log(e)
        state.unreadMsgLength++
        const event = JSON.parse(e.data).event
        //历史消息里面是否已有这个用户发来的信息
        let hasUser = false
        const m = {
          words: event.message,
          time: event.time,
        }
        //这个i是数字
        for(let i in state.historyMsg) {
          if(state.historyMsg[i].username == event.from_username) {
            state.historyMsg[i].msg.push(m)
            state.historyMsg[i].unreadCount++
            hasUser = true
            break
          }
        }
        if(!hasUser) {
          let obj = {
            user_id: event.from_user,
            username: event.from_username,
            avatar_url: event.avatar_url,
            msg: [m],
            unreadCount: 1,
          }
          state.historyMsg.push(obj)
        }
      }
    },
    //设置要聊天对象的信息
    setChatToUser(state, obj) {
      state.chatToUser = obj
    },
    //设置聊天组名
    setGroupName(state, id) {
      const myId = window.localStorage.getItem('id')
      const otherId = id
      state.group_name = (myId - otherId < 0) ? `${myId}_${otherId}` : `${otherId}_${myId}`
    },
    //清空聊天组名
    clearGroupName(state) {
      state.group_name = ''
    },
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
    //设置聊天对象的信息
    actionSetChatToUser({commit}, obj) {
      commit('setChatToUser', obj)
    },

    //初始化消息推送
    actionInitMessagePush({commit}, channel) {
      console.log('channel1', channel)
      commit('initMessagePush', channel)
      commit('messagePushOnMessage')
      commit('messagePushOnError', channel)
      commit('messagePushOnClose')
    },

    //关闭消息推送
    actionCloseMessagePush({commit}) {
      commit('closeMessagePush')
    },

    //减少未读信息的数量
    actionReduceUnreadMsg({commit}, num) {
      commit('reduceUnreadMsg', num)
    },

    //设置聊天组名
    actionSetGroupName({commit}, otherId) {
      commit('setGroupName', otherId)
    },

    //清空聊天组名
    actionClearGroupName({commit}) {
      commit('clearGroupName')
    },

    //将某个用户发来的信息设为已读状态
    actionChangeReadState({commit}, name) {
      commit('changeReadState', name)
    },

    //清空消息记录
    actionClearMsgRecord({commit}) {
      commit('clearMsgRecord')
    }
  },
  getters: {
    showCount: state => {
      return '目前的count等于' + state.count
    },
    chatToUser: (state) => {
      return state.chatToUser
    },
    group_name: (state) => {
      return state.group_name
    },
  }
})

