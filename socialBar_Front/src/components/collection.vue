<template>
  <div class="fanList">
    <van-pull-refresh class="coList" v-model="isLoading" @refresh="getPostList">
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
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 下拉刷新
      isLoading: false,
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
      this.getPostList(this.postList[this.postList.length - 1].iId)
    },
    // 获取动态列表
    getPostList(lastId) {
      this.siteList.forEach(item => {
        this.sites.push(item.id)
      })
      console.log(this.sites)
      this.$get('/getCollectionList', {
        lastId
      }).then(res => {
        if(res.data.success) {
          this.isLoading = false
          this.loading = false
          if(lastId) {
            this.postList.push.apply(this.postList, res.data.postList)
          } else {
            this.postList = res.data.postList
            this.finished = false
          }
          if(res.data.postList.length < 10) {
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
  .coList {
    height: calc(100vh - 96px);
    overflow: auto;
  }
  // .header {
  //   width: 100%;
  //   z-index: 2;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  // }
  .listBox {
    // margin-top: 46px;
  }
}
</style>