<template>
  <div class="posBox">
    <div class="title">
      <van-image
        round
        image-fit="cover"
        width="40px"
        height="40px"
        @click="toHome"
        :src="avatar"
      />
      <div class="info">
        <div>
          <div class="firstLine">
            <div class="nickName" @click="toHome">{{nickName}}</div>
            <div class="gender boy" v-if="gender == 1">♂</div>
            <div class="gender girl" v-if="gender == 2">♀</div>
            <div class="edu">{{ education }}</div>
          </div>
          <div class="secondLine">
            <div>{{ currentSchool }}</div>
          </div>
        </div>
        <div v-if="detail" class="follow">
          <van-button v-show="!followStatus" :loading="fLoading" loading-type="spinner" type="info" @click="follow">关注</van-button>
          <van-button v-show="followStatus" :loading="fLoading" loading-type="spinner" type="default" @click="follow">已关注</van-button>
        </div>
      </div>
    </div>
    <div v-if="!detail" class="mainContent" @click="postDetail">
      <div v-html="showContent" :ref="'hideContent' + id" :id="'hideContent' + id" class="content hideContent">
      </div>
      <!-- <span v-if="textHide" class="showBtn">展开</span> -->
    </div>
    <div v-else class="mainContent">
      <div v-html="showContent" :ref="'hideContent' + id" :id="'hideContent' + id" class="content">
      </div>
      <!-- <span v-if="textHide" class="showBtn">展开</span> -->
    </div>
    <div class="imgs">
      <van-image
        v-for="(item,index) in imgs"
        :key="index"
        image-fit="cover"
        fit="cover"
        style="margin: 0.2rem .2rem"
        width="6rem"
        height="6rem"
        @click="getImg(index)"
        :src="item"
      />
    </div>
    <div class="bottomLine">
      <div class="time">
        {{ createTime }}
      </div>
      <div class="location" v-if="city">
        <van-icon name="location-o" />
        <div style="margin-left: 8px; font-size:14px;">{{ city }}</div>
      </div>
    </div>
    <div class="activeLine">
      <van-icon name="good-job-o" :style="goodStyle" @click="goodClick"><div class="num">{{ goodNum1 == 0 ? '' : this.goodNum1 }}</div></van-icon>
      <van-icon name="comment-o" @click="commentClick"><div class="num">{{ commentNum1 == 0 ? '' : this.commentNum1 }}</div></van-icon>
      <van-icon name="star-o" :style="starStyle" @click="starClick"><div class="num">{{ starNum1 == 0 ? '' : this.starNum1 }}</div></van-icon>
      <van-icon name="more-o" @click="shareClick"><div class="num">{{ shareNum1 == 0 ? '' : this.shareNum1 }}</div></van-icon>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  props: {
    // 是否关注
    followed: {
      type: Boolean,
      default: false
    },
    // 发布用户Id
    uId: {
      type: Number,
    },
    // 动态id
    id: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: ""
    },
    goodNum: {
      type: String | Number,
      default: ""
    },
    commentNum: {
      type: String | Number,
      default: ""
    },
    starNum: {
      type: String | Number,
      default: ""
    },
    shareNum: {
      type: String | Number,
      default: ""
    },
    // 昵称
    nickName: {
      type: String,
      default: ""
    },
    // 性别
    gender: {
      type: Number,
      default: 1
    },
    // 学历
    currentEducation: {
      type: Number,
      default: 1
    },
    // 就读学校
    currentSchool: {
      type: String,
      default: ""
    },
    // 内容
    content: {
      type: String,
      default: ""
    },
    // 图片
    imgs: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 定位
    city: {
      type: String,
      default: ""
    },
    // 创建时间
    createTime: {
      type: String,
      default: "xx"
    },
    // 点赞
    liked: {
      type: Boolean,
      default: false
    },
    // 收藏
    stared: {
      type: Boolean,
      default: false
    },
    // 是否是详情页
    detail: {
      type: Boolean,
      default: false
    },
    // 点击评论
    commentClick: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    // 点赞数改变
    goodNum(val) {
      this.goodNum1 = val
    },
    // 评论数改变
    commentNum(val) {
      this.commentNum1 = val
    },
    // 收藏数改变
    starNum(val) {
      this.starNum1 = val
    },
    // 分享数改变
    shareNum(val) {
      this.shareNum1 = val
    },
    // 点赞
    liked(val) {
      this.goodStatus = val
      if(this.goodStatus) {
        this.goodStyle = {
          color: "blue"
        }
      } else {
        this.goodStyle = {
        }
      }
    },
    // 收藏
    stared(val) {
      this.starStatus = val
      if(this.starStatus) {
        this.starStyle = {
          color: "blue"
        }
      } else {
        this.starStyle = {
        }
      }
    }
  },
  data() {
    return {
      // 关注加载
      fLoading:false,
      // 显示内容
      showContent: this.content.replace(/\n/g, "<br/>"),
      // 点赞样式
      goodStyle: {},
      // 收藏样式
      starStyle: {},
      // 点赞数
      goodNum1: this.goodNum,
      // 评论数
      commentNum1: this.commentNum,
      // 收藏数
      starNum1: this.starNum,
      // 分享数
      shareNum1: this.shareNum,
      // 显示分享面板
      showShare: false,
      // 是否点赞该评论
      goodStatus: this.liked,
      // 是否收藏该评论
      starStatus: this.stared,
      // 是否关注
      followStatus: this.followed,
      // 分享图标
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },
        ],
      ],
    }
  },
  computed: {
    // 学历转换
    education() {
      switch(this.currentEducation) {
        case 1:
          return '专科'
        case 2:
          return '本科'
        case 3:
          return '硕士'
        case 4:
          return '博士'
      }
    },
    // textHide() {
    //   // console.log('hideContent' + this.id)
    //   this.$nextTick(() => {
    //     console.log(document.getElementById('hideContent' + this.id).offsetHeight > 66)
    //     return document.getElementById('hideContent' + this.id).offsetHeight > 66
    //   })
    // },
    // // 是否点赞该评论
    // goodStatus() {
    //   return false
    // },
    // // 是否收藏
    // starStatus() {
    //   return false
    // },
    // 是否分享
    shareStatus() {
      return true
    }
  },
  mounted() {
    if(this.goodStatus) {
      this.goodStyle = {
        color: "blue"
      }
    }
    if(this.starStatus) {
      this.starStyle = {
        color: "blue"
      }
    }
  },
  methods: {
    // 去往某人主页
    toHome() {
      this.$router.push({
        name: 'otherHome',
        query: {
          id: this.uId
        }
      })
    },
    // 点击关注
    follow() {
      this.fLoading = true
      this.$post('/followStu', {
        id: this.uId,
        type: this.followStatus ? '2' : '1'
      }).then(res => {
        this.$mess(res)
        this.fLoading = false
        if (res.success) {
          this.followStatus = !this.followStatus
        }
      })
    },
    // 动态详情
    postDetail() {
      this.$router.push({
        name: 'postDetail',
        query: {
          id: this.id
        }
      })
    },
    // 图片预览
    getImg(index) {
      ImagePreview({
        images:this.imgs,
        showIndex:true,
        loop:false,
        startPosition:index
      })
    },
    // 点赞
    goodClick() {
      this.$post('like', {
        id: this.id,
        type: this.goodStatus ? '1' : '2'
      }).then(res => {
        console.log(res)
      })
      if(this.goodStatus) {
        this.goodStyle = {}
        this.goodNum1 -= 1
        this.goodStatus = false
      } else {
        this.goodStyle = {
          color: "blue"
        }
        this.goodNum1 += 1
        this.goodStatus = true
      }
    },
    // 点收藏
    starClick() {
      this.$post('like', {
        id: this.id,
        type: this.starStatus ? '3' : '4'
      }).then(res => {
        console.log(res)
      })
      if(this.starStatus) {
        this.starStyle = {}
        this.starNum1--
        this.starStatus = false
      } else {
        this.starStyle = {
          color: "blue"
        }
        this.starNum1++
        this.starStatus = true
      }
    },
    // 点分享
    shareClick() {
      console.log('分享')
      this.showShare = true
    }
  }
}
</script>

<style lang="less" scoped>
.posBox {
  padding: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .title {
    height: 40px;
    display: flex;
    align-items: center;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(90vw - 40px);
      .firstLine {
        display: flex;
        padding: 0 15px;
        line-height: 25px;
        .boy {
          color: rgb(40, 40, 240);
          padding-left: 10px;
        }
        .girl {
          color: rgb(207, 47, 159);
          padding-left: 10px;
        }
        .edu {
          padding-left: 10px;
        }
      }
      .secondLine {
        display: flex;
        padding: 0 15px;
        font-size: 12px;
        line-height: 15px;
      }
      .follow {
        /deep/ .van-button {
          height: 30px;
        }
      }
    }
  }
  .mainContent {
    text-align: left;
    width: 100%;
    .content {
      width: 100%;
      text-align: left;
      margin-top: 10px;
      // height: 5.6rem;
      // overflow: hidden;
      word-wrap:break-word ;
      line-height: 22px;
    }
    .hideContent {
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .showBtn {
      pointer-events: auto;
      vertical-align: top;
      position: relative;
      font-size: 16px;
      color: #5090cc;
    }
  }
  .imgs {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    /deep/ .van-image {
      margin: 5px 0;
    }
  }
  .bottomLine {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction:row-reverse;
    .location {
      display: flex;
      align-items: center;
    }
    .time {
      font-size: 14px;
    }
  }
  .activeLine {
    margin-top: 8px;
    line-height: 30px;
    display: flex;
    justify-content: space-around;
    /deep/ .van-icon {
      display: flex;
      height: 20px;
      line-height: 20px;
      align-items: center;
      font-size: 20px;
    }
    .num {
      margin-left: 4px;
      font-size: 12px;
    }
  }
}

</style>