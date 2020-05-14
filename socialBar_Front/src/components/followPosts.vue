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
    }
  },
  mounted() {
    this.getPostList()
  },
  computed: {
    sites() {
      let list = []
      this.siteList.forEach(item => {
        list.push(item.id)
      })
      return list
    }
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
      console.log(this.sites)
      this.$post('/followPostList', {
        lastId,
        siteList: this.sites
      }).then(res => {
        if(res.success) {
          this.isLoading = false
          this.loading = false
          if(lastId) {
            this.postList.push.apply(this.postList, res.postList)
          } else {
            this.$store.commit('clearUnReadPost')
            this.postList = res.postList
            this.finished = false
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
}
</style>