<template>
    <div class="main">
        <Header search :options="options" @onSearch="onSearch" />
        <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->
        <router-view></router-view>
        <van-tabbar v-model="bottomActive" @change="tabChange">
          <van-tabbar-item name="main" icon="home-o">主页</van-tabbar-item>
          <van-tabbar-item name="followPosts" icon="description" :badge="unReadPost">动态</van-tabbar-item>
          <van-tabbar-item name="post" @click="beforePost" class="upload" icon="plus">发表</van-tabbar-item>
          <van-tabbar-item name="chatList" icon="chat-o" :badge="unreadMsgLength ? unreadMsgLength : ''">消息</van-tabbar-item>
          <van-tabbar-item name="mine" icon="setting-o" >我的</van-tabbar-item>
        </van-tabbar>
        <van-popup class="popup" v-model="postShow" position="bottom" :style="{ height: '100%', textAlign: 'left' }" >
          <Header back rIcon :leftClick="leftClick" title="发表你的动态" rText="发布" :rightClick="rightClick"></Header>
          <div style="padding: 10px;">
            <van-field
              v-model="content"
              rows="4"
              autosize
              type="textarea"
              placeholder="快分享您的动态吧！"
              show-word-limit
            />
            <van-uploader style="margin: 10px 16px" :max-count="9" :after-read="afterRead" image-fit="cover" v-model="fileList">
            </van-uploader>
            <div class="location" @click="getLocation">
              <van-icon name="location-o" />
              <div style="margin-left: 5px;">{{ LocationCity }}</div>
            </div>
          </div>
        </van-popup>
    </div>
</template>

<script>
import BMap from 'BMap';
import { mapState } from 'vuex'
export default {
    data() {
      return {
        message: '',
        postShow: false,
        currentSite: "全国热门",
        options: JSON.parse(localStorage.getItem('siteList')),
        // 当前选中的底部标签
        bottomActive: this.$store.state.bottomTab,
        // 动态图片列表
        fileList: [],
        // 动态文字内容
        content: '',
        // 定位显示
        LocationCity: '你在哪里?',
        // 是否获取定位
        success: false,
        // 搜索内容
        sValue: ""
      }
    },
    watch: {
    },
    computed: {
      ...mapState([
        'bottomTab',
        'unreadMsgLength',
        'unReadPost',
      ]),
    },
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     vm.correctTab = vm.$store.state.bottomTab
    //     vm.bottomActive = vm.$store.state.bottomTab
    //   })
    // },
    activated() {
      if(this.$store.state.bottomTab == 'main') {
        this.bottomActive = this.$store.state.bottomTab
      }
    },
    methods: {
      // 搜索
      onSearch(val) {
        if(!val) {
          this.$toast.fail("请输入搜索信息")
          return false
        }
        this.$store.commit('setSearchValue', val)
        this.$router.push({
          name: 'search',
          query: {
            val
          }
        })
      },
      beforePost() {
        this.postShow = true
      },
      afterRead(file) {
        console.log(file)
        console.log(this.fileList)
      },
      tabChange(val) {
        if (val != "post" && this.$route.path.indexOf(val) == -1) {
          this.$router.push("/" + val)
          this.$store.commit('setBottomTab', val)
        } else {
          this.bottomActive = this.$store.state.bottomTab
          this.$store.commit('setBottomTab', this.bottomActive)
        }
      },
      leftClick() {
        this.postShow = false
      },
      rightClick() {
        if(!this.$validate.statusValidate()) {
          this.$dialog.confirm({
            title: '发布失败',
            message: '完成实名认证,解锁更多操作',
          })
          .then(() => {
            this.postShow = false
            this.tabChange('mine')
          })
          .catch(() => {
            // on cancel
          });
          return false
        }
        if(!this.content && this.fileList.length === 0) {
          this.$toast.fail('请输入动态内容')
          return false
        }
        this.$post('/postDynamic', {
          content: this.content,
          imgs: this.fileList,
          createPlace: this.success ? this.LocationCity : "",
          nickName: localStorage.getItem('name'),
          site: this.$store.state.currentSite
        }).then(res => {
          this.$mess(res)
          if(res.success) {
            this.postShow = false
            this.content = ""
            this.fileList = []
          }
        })
      },
      // 获取当前城市定位
      getLocation() {
        if (this.success) {
          this.LocationCity = '你在哪里?'
          this.success = false
          return
        }
        const geolocation = new BMap.Geolocation();
        var _this = this;
        _this.LocationCity = '正在定位';
        geolocation.getCurrentPosition(function getinfo(position){
          let city = position.address.city;             //获取城市信息
          let province = position.address.province;    //获取省份信息
          _this.LocationCity = city;
          _this.success = true;
        }, function(e) {
          _this.LocationCity = '定位失败, 请点击重试';
          this.success = false;
        }, {provider: 'baidu'});
      }
    }
}
</script>

<style lang="less" scoped>
.main {
    min-height: 100vh;
    .content {
      min-height: calc(100vh - 60px);
    }
    .location {
      display: flex;
      align-items: center;
      position: fixed;
      left: 10px;
      bottom: 5px;
    }
}
.upload {
    /deep/ .van-tabbar-item__icon {
      margin-top: -6px;
      font-size: 26px;
    }
}
/deep/ .van-nav-bar__right {
    max-width: 30%;
}
/deep/ .van-tabs__line {
    z-index: 0;
}
.popup {
  /deep/ .van-cell:not(:last-child)::after {
    border: none
  }
}
// /deep/ .van-toast {
//   width: 50%;
// }
</style>