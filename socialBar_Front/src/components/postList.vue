<template>
  <div class="fanList">
      <Header class="header" back title="发表动态列表" :leftClick="leftClick" />
      <van-list
        class="listBox"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in postList" :key="item.id">
          <postBox :id="item.id" :avatar="item.avatar" :city="item.createPlace" :createTime="item.createTime"
            :imgs="arr(item.imgs)" :content="item.content" :currentSchool="item.currentSchool"
            :nickName="item.userName" :gender="item.gender" :currentEducation="item.currentEducation"
            :goodNum="item.likes" :commentNum="item.comments" :starNum="item.stars" :shareNum="item.forwards"
            :stared="item.stared" :liked="item.liked" />
        </div>
      </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 站点列表
      siteList: JSON.parse(localStorage.getItem('siteList')),
      // 懒加载
      loading: false,
      // 是否加载全部完成
      finished: false,
      // 动态列表
      postList: [],
      sites: []
    }
  },
  mounted() {
    this.getPostList()
  },
  methods: {
    arr(list) {
      return eval(list)
    },
    // 下拉加载
    onLoad() {
      this.getPostList(this.postList[this.postList.length - 1].id)
    },
    // 获取动态列表
    getPostList(lastId) {
      this.siteList.forEach(item => {
        this.sites.push(item.id)
      })
      console.log(this.sites)
      this.$post('/getPostList', {
        userId: this.$route.query.id,
        siteList: this.sites,
        lastId
      }).then(res => {
        if(res.success) {
          this.loading = false
          if(lastId) {
            this.postList.push.apply(this.postList, res.postList)
          } else {
            this.postList = res.postList
          }
          if(res.postList.length < 10) {
            this.finished = true
          }
        }
      })
    },
    // 返回
    leftClick() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="less" scoped>
.fanList {
  .header {
    width: 100%;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
  }
  .listBox {
    margin-top: 46px;
  }
}
</style>