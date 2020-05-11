<template>
  <div class="mine">
    <Header class="header" back :title="userInfo.name + '的主页'" :leftClick="leftClick" />
    <div class="topCard"></div>
    <div class="mainCard">
      <div class="personalInfo">
        <div class="avatar">
          <van-image
            round
            image-fit="cover"
            width="80px"
            height="80px"
            :src="userInfo.showImg"
            @click="getImg"
          />
        </div>
        <div class="sName">{{ userInfo.name }}</div>
        <div class="follow">
          <van-button v-show="!followStatus" :loading="fLoading" loading-type="spinner" type="info" @click="follow">关注</van-button>
          <van-button v-show="followStatus" :loading="fLoading" loading-type="spinner" type="default" @click="follow">已关注</van-button>
        </div>
      </div>
      <div class="mainInfo">
        <div @click="showFanList">
          <div>{{ userInfo.fansNum }}</div>
          <div class="label">粉丝</div>
        </div>
        <div style="height: 30px; border-left: 1px solid #ccc;"></div>
        <div @click="showStarList">
          <div>{{ userInfo.starsNum }}</div>
          <div class="label">关注</div>
        </div>
        <div style="height: 30px; border-left: 1px solid #ccc;"></div>
        <div @click="showPostList">
          <div>{{ userInfo.postsNum }}</div>
          <div class="label">动态</div>
        </div>
      </div>
    </div>
    <div class="settings">
      <van-cell :title-style="{ textAlign: 'left' }" is-link :value="userInfo.isVerified == 1 ? '已认证' : '未认证' ">
        <template #title>
          <span class="custom-title">实名认证</span>
          <van-tag v-show="userInfo.isVerified == 2" type="danger">游客</van-tag>
          <van-tag v-show="userInfo.isVerified == 1" type="success">会员</van-tag>
        </template>
      </van-cell>
    </div>
    <van-cell-group style="text-align: left; margin-top: 20px;">
      <van-field label="uuid" readonly :value="userInfo.uId" input-align="right" />
      <van-field v-show="userInfo.status != 2" label="就读学校" readonly :value="userInfo.currentSchool" input-align="right" />
      <van-field v-show="userInfo.status != 2" label="当前学历" readonly :value="currentEducation" input-align="right" />
    </van-cell-group>
    <div class="chatBtn" @click="toChat">
      <van-button style="width: 100%" type="info">私 信</van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      // 关注加载
      fLoading:false,
      // 是否关注该用户
      followStatus: false,
      // 用户信息
      userInfo: {
        // 用户认证状态
        status: 1,
        // 关注数量
        starsNum: 0,
        // 粉丝数量
        fansNum: 0,
        // 发表动态数量
        postsNum: 0,
        // 就读学校
        currentSchool: "",
        // 用户id
        uId: "",
        // 学历
        education: 1,
        // 用户昵称
        name: "",
        // 是否认证
        isVerified: "",
        // 显示头像
        showImg: "",
      },
    }
  },
  created() {
    if(this.$route.query.id == localStorage.getItem('id')) {
      this.$router.replace('/mine')
      this.$store.commit('setBottomTab', 'mine')
    }
  },
  computed: {
    // 当前学历
    currentEducation() {
      switch(this.userInfo.education) {
        case 4:
          return '博士'
        case 3:
          return '硕士'
        case 2:
          return '本科'
        case 1:
          return '专科'
      }
    }
  },
  mounted() {
    this.getStuInfo()
  },
  methods: {
    // 去聊天
    toChat() {
      this.$router.push({
        name: 'chat',
        query: {
          id: this.userInfo.uId,
          name: this.userInfo.name,
          avatar: this.userInfo.showImg
        }
      })
    },
    // 点击关注
    follow() {
      this.fLoading = true
      this.$post('/followStu', {
        id: this.userInfo.uId,
        type: this.followStatus ? '2' : '1'
      }).then(res => {
        this.$mess(res)
        this.fLoading = false
        if (res.success) {
          this.followStatus = !this.followStatus
          this.getStuInfo()
        }
      })
    },
    // 图片预览
    getImg() {
      ImagePreview({
        images:[this.userInfo.showImg],
        loop:false,
        startPosition:0
      })
    },
    // 返回
    leftClick() {
      this.$router.go(-1)
    },
    // 获取关注列表
    showStarList() {
      if(this.userInfo.starsNum === 0) {
        this.$toast.fail('还没有关注的人~')
        return false
      }
      this.$router.push({
        name: 'starList',
        query: {
          id: this.userInfo.uId
        }
      })
    },
    // 获取粉丝列表
    showFanList() {
      if(this.userInfo.fansNum === 0) {
        this.$toast.fail('还没有人关注~')
        return false
      }
      this.$router.push({
        name: 'fanList',
        query: {
          id: this.userInfo.uId
        }
      })
    },
    // 获取发表动态列表
    showPostList() {
      if(this.userInfo.postsNum === 0) {
        this.$toast.fail('还没有发表动态~')
        return false
      }
      this.$router.push({
        name: 'postList',
        query: {
          id: this.userInfo.uId
        }
      })
    },
    // 获取用户信息
    getStuInfo(){
      this.$get('/getUserInfo', {
        userId: this.$route.query.id
      }).then(res => {
        if(res.data.success) {
          this.userInfo.starsNum = res.data.studentInfo.starsNum
          this.userInfo.fansNum = res.data.studentInfo.fansNum
          this.userInfo.postsNum = res.data.studentInfo.postsNum
          this.userInfo.uId = res.data.studentInfo.id
          this.userInfo.name = res.data.studentInfo.nickName
          this.userInfo.currentSchool = res.data.studentInfo.currentSchool
          this.userInfo.education = res.data.studentInfo.currentEducation
          this.userInfo.status = res.data.studentInfo.status
          this.userInfo.showImg = res.data.studentInfo.avatar
          this.userInfo.isVerified = res.data.studentInfo.status
          this.followStatus = res.data.studentInfo.followed
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.mine {
  background-color: rgb(248, 248, 248);
  min-height: 100vh;
  height: 100%;
  .header {
    // position: fixed;
    // width: 100%;
    // top: 0;
    // left: 0;
    // z-index: 2;
  }
  .topCard {
    width: 100%;
    height: 180px;
    background: rgb(82, 144, 255)
  }
  .mainCard {
    width: 80%;
    margin-left: 10%;
    margin-top: -100px;
    height: 160px;
    background-color: #fff;
    .personalInfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 15px;
      padding-top: 5px;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        .img {
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
      }
      .sName {
        // width: 60%;
      }
      /deep/ .van-icon-edit {
        font-size: 24px;
      }
    }
    .mainInfo {
      height: 50px;
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .label {
        font-size: 14px;
        color: rgb(122, 115, 115);
      }
    }
  }
  .settings {
    margin-top: 30px;
  }
  .chatBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>