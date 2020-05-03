<template>
  <div class="posBox">
    <div class="title">
      <van-image
        round
        image-fit="cover"
        width="40px"
        height="40px"
        :src="avatar"
      />
      <div class="info">
        <div class="firstLine">
          <div class="nickName">nickName</div>
          <div class="gender boy">♂</div>
          <div class="gender girl">♀</div>
          <div class="edu">博士</div>
        </div>
        <div class="secondLine">
          <div>嘻嘻大学</div>
        </div>
      </div>
    </div>
    <div class="content">
      啊是吊事都哈搜到还哦谁都下收到
      啊是吊事都哈搜到还哦谁都下收到
      啊是吊事都哈搜到还哦谁都下收到
    </div>
    <div class="imgs">
      <van-image
        image-fit="cover"
        width="30%"
        height="30%"
        :src="avatar"
      />
      <van-image
        image-fit="cover"
        width="30%"
        height="30%"
        :src="avatar"
      />
      <van-image
        image-fit="cover"
        width="30%"
        height="30%"
        :src="avatar"
      />
      <van-image
        image-fit="cover"
        width="30%"
        height="30%"
        :src="avatar"
      />
    </div>
    <div class="activeLine">
      <van-icon name="good-job-o" :style="goodStyle" @click="goodClick"><div class="num">{{goodNum1}}</div></van-icon>
      <van-icon name="comment-o"><div class="num" @click="commentClick">{{ commentNum1 }}</div></van-icon>
      <van-icon name="star-o"><div class="num" @click="starClick">{{starNum1}}</div></van-icon>
      <van-icon name="more-o"><div class="num" @click="shareClick">{{shareNum1}}</div></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
    }
  },
  data() {
    return {
      // 点赞样式
      goodStyle: {},
      // 点赞数
      goodNum1: this.goodNum,
      // 评论数
      commentNum1: this.commentNum,
      // 收藏数
      starNum1: this.starNum,
      // 分享数
      shareNum1: this.shareNum
    }
  },
  computed: {
    // 是否点赞该评论
    goodStatus() {
      return true
    },
    // 是否收藏
    starSatus() {
      return true
    },
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
  },
  methods: {
    // 点赞
    goodClick() {
      if(this.goodStatus) {
        this.goodStyle = {}
        this.goodNum1--
      } else {
        this.goodStyle = {
          color: "blue"
        }
        this.goodNum1++
      }
    },
    // 点评论
    commentClick() {},
    // 点收藏
    starClick() {},
    // 点分享
    shareClick() {}
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
  }
  .content {
    text-align: left;
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    /deep/ .van-image {
      margin: 5px 0;
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