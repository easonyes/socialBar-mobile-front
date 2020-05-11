<template>
  <div class="chat">
    <!-- <v-header :headerMsg="headerMsg"></v-header> -->
    <Header class="header" back :title="chatToUser.name" :leftClick="leftClick" />
    <div class="chat-content" ref="container">
      <div v-for="(obj, index) in msgRecord" :key="index">
        <v-my-msg
          v-if="obj.id == myUserInfo.id"
          :msg="obj.msg"
          :avatar="obj.avatar"
          :mytime="obj.time"></v-my-msg>
          <v-other-msg
          v-else
          :msg="obj.msg"
          :avatar="obj.avatar"
          :mytime="obj.time"></v-other-msg>
      </div>
    </div>
    <div class="bottomLine">
      <van-field
        v-model="input"
        ref="commentInput"
        left-icon="edit"
        placeholder="发个消息聊聊呗~">
        <template #button>
          <van-button size="small" @click="websocketsend" type="primary">发表</van-button>
        </template>
      </van-field>
    </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import * as url from '../api/urlConfig'
  import myMsg from '@/common/myMsg'
  import otherMsg from '@/common/otherMsg'
  // import myHeader from '@/components/header'
  export default{
    name:'chat',
    components: {
      'v-my-msg': myMsg,
      'v-other-msg': otherMsg,
      // 'v-header': myHeader,
    },
    data(){
      return{
        chatToUser: {},
        input:'',
        myUserInfo:{}, //我的个人信息
        headerMsg: {
          centerWord: '',
          //这种绑定的图片只能放在static文件夹下
          // leftImg: '/static/images/back.png',
        },
        container: {}, //.chat-content容器
        websock: null,
        msgRecord: [], //消息记录
      }
    },
    created() {
      this.chatToUser.name = this.$route.query.name
      this.chatToUser.id = this.$route.query.id
      this.chatToUser.avatar = this.$route.query.avatar
      this.myUserInfo = JSON.parse(window.localStorage.getItem('userinfo'))
      this.myUserInfo.id = parseInt(window.localStorage.getItem('id'))
      this.initWebSocket();
      //获取该聊天组的历史消息
      const hm = JSON.parse(window.localStorage.getItem(this.group_name))
      if(hm) {
        this.msgRecord = hm
      }
      //时间格式化
      Date.prototype.Format = function (fmt) {
        var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
    computed: {
      ...mapGetters([
        'group_name',
      ]),
    },
    destroyed() {
      //离开路由之后断开websocket连接
      this.websock.close()
    },
    mounted() {
      //设置输入框在界面中的位置
      //这里不能写在created()里，因为那时候元素还没有加载好
      this.container = document.querySelector('.chat-content')
      const pageHeight = window.innerHeight;
      // const inputHeight = document.querySelector('.el-input').offsetHeight
      // this.container.style.height = `${pageHeight - inputHeight - 50}px`;
      // 自动滚动到底部
      this.$nextTick(() => {
        this.$refs['container'].scrollTop = document.querySelector('.chat-content').scrollHeight
      })
    },
    methods: {
      // 返回
      leftClick() {
        this.websocketclose()
        window.localStorage.setItem(this.group_name, JSON.stringify(this.msgRecord))
        this.actionClearGroupName()
        this.$router.go(-1)
      },
      ...mapActions([
        'actionClearGroupName',
      ]),
      //初始化weosocket
      initWebSocket(){
        let group_name = this.myUserInfo.id > this.chatToUser.id ? `${this.chatToUser.id}_${this.myUserInfo.id}` : `${this.myUserInfo.id}_${this.chatToUser.id}`
        //const wsuri = `wss://www.fanfei.site/ws/chat/${this.group_name}/`;
        const wsuri = `${url.chat}/${group_name}/`;
        //alert(`地址：${wsuri}`)
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      //连接建立之后执行send方法发送数据
      websocketonopen(){
        console.log('WebSocket连接成功')
      },
      //连接建立失败重连
      websocketonerror(e){
        console.log(`连接失败的信息：${e}`)
        this.initWebSocket();
      },
      //数据接收
      websocketonmessage(e){
        const redata = JSON.parse(e.data);
        //let name = ''
        //let avatar = ''
        console.log(redata)
        if(redata.from_user == this.chatToUser.id) {
          //name = this.chatToUser.username
          //avatar = this.chatToUser.avatar
          //const time = redata.time
          const obj = {
            name: this.chatToUser.name,
            msg: redata.message,
            avatar: this.chatToUser.avatar,
            time: redata.time
          }
          this.msgRecord.push(obj)
          this.$nextTick(() => {
            this.$refs['container'].scrollTop = document.querySelector('.chat-content').scrollHeight
          })
        } else if(redata.from_user == this.myUserInfo.id) {
          console.log('消息发送成功')
        } else {
          console.log('返回未知消息')
        }
      },
      //数据发送
      websocketsend(){
        const time = new Date().Format("yyyy-MM-dd hh:mm:ss")
        let obj = {
          from_user: this.myUserInfo.id,
          to_user: parseInt(this.chatToUser.id),
          message: this.input,
          time: time
        }
        //发给后端的数据需要字符串化
        this.websock.send(JSON.stringify(obj));
        // this.websock.send(JSON.stringify("1"));
        obj = {
          id: this.myUserInfo.id,
          name: this.myUserInfo.nickname,
          msg: this.input,
          avatar: this.myUserInfo.avatar,
          time: time
        }
        this.msgRecord.push(obj)
        this.$nextTick(() => {
           document.querySelector('.chat-content').scrollTop = document.querySelector('.chat-content').scrollHeight
        })
        this.input = ''
      },
      //关闭
      websocketclose(e){
        console.log('断开连接',e);
      },
      //返回
      headerLeft() {
        this.websocketclose()
        window.localStorage.setItem(this.group_name, JSON.stringify(this.msgRecord))
        this.actionClearGroupName()
        history.back()
      },
    }
  }
</script>

<style lang="less" scoped>
.chat {
  .header {
    position: fixed;
    z-index: 9;
    width: 100%;
    top: 0;
    left: 0;
  }
  .el-input {
    font-size: 15px;
    z-index: 10;
  }
  .chat-content {
    width: 100%;
    margin-top: 46px;
    margin-bottom: 51px;
    overflow: scroll;
    background: #ffffff;
  }
  .bottomLine {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    /deep/ .van-cell {
      line-height: 30px;
    }
  }
}
</style>