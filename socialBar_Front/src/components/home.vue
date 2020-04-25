<template>
    <div class="main">
        <Header :title="currentSite" :options="options" />
        <router-view></router-view>
        <van-tabbar v-model="bottomActive" @change="tabChange">
          <van-tabbar-item name="main" icon="home-o">主页</van-tabbar-item>
          <van-tabbar-item name="collection" icon="description">收藏</van-tabbar-item>
          <van-tabbar-item name="post" @click="postShow = true" class="upload" icon="plus">发表</van-tabbar-item>
          <van-tabbar-item name="chat" icon="chat-o" info="5">消息</van-tabbar-item>
          <van-tabbar-item name="mine" icon="setting-o" :dot="true">我的</van-tabbar-item>
        </van-tabbar>
        <van-popup class="popup" v-model="postShow" position="bottom" :style="{ height: '100%', textAlign: 'left' }" >
          <Header rIcon :leftClick="leftClick" title="发表你的动态" rText="发布" :rightClick="rightClick"></Header>
          <div style="padding: 10px;">
            <van-field
              v-model="content"
              rows="4"
              autosize
              type="textarea"
              placeholder="快分享您的动态吧！"
              show-word-limit
            />
            <van-uploader style="margin: 10px 16px" :after-read="afterRead" image-fit="cover" v-model="fileList">
            </van-uploader>
          </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    data() {
      return {
        message: '',
        postShow: false,
        currentSite: "全国热门",
        options: this.$store.state.siteList,
        // 当前选中的底部标签
        bottomActive: "main",
        // 动态图片列表
        fileList: [],
        // 动态文字内容
        content: ''
      }
    },
    methods: {
      afterRead(file) {
        console.log(file)
        console.log(this.fileList)
      },
      tabChange(val) {
        if (val != "post" && this.$route.path.indexOf(val) == -1) {
          this.$router.push("/" + val)
        } else {
          // this.postShow = true
        }
      },
      leftClick() {
        this.postShow = false
      },
      rightClick() {
        this.$post('/postDynamic', {

        }).then(res => {
          console.log(res)
        })
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