<template>
  <div class="searchPage">
    <div class="header">
      <van-nav-bar
        left-arrow
        @click-left="leftClick">
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" slot="title" />
      </van-nav-bar>
    </div>
    <van-tabs v-model="active" swipeable @change="tabChange">
      <van-tab title="动态">
        <van-pull-refresh class="coList" v-model="isLoading" @refresh="postSearch">
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
      </van-tab>
      <van-tab title="用户">
        <van-pull-refresh class="coList userBox" v-model="isLoading" @refresh="userRearch">
          <!-- <div>刷新次数: {{ count }}</div> -->
          <van-list
            v-model="loading1"
            :finished="finished1"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad1"
          >
            <div v-for="item in userList" :key="item.id">
              <div class="title">
                <van-image
                  round
                  @click="toHome(item.id)"
                  image-fit="cover"
                  width="40px"
                  height="40px"
                  :src="item.avatar"
                />
                <div class="info">
                  <div>
                    <div class="firstLine">
                      <div class="nickName" @click="toHome(item.id)">{{item.nickname}}</div>
                      <div class="gender boy" v-if="item.gender == 1">♂</div>
                      <div class="gender girl" v-if="item.gender == 2">♀</div>
                      <div class="edu" v-if="item.status != 2">{{ $common.educationChange(item.currentEducation) }}</div>
                    </div>
                    <div class="secondLine">
                      <div>{{ item.currentSchool }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
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
      loading1: false,
      // 是否加载全部完成
      finished: false,
      finished1: false,
      // 动态列表
      postList: [],
      // 搜索内容
      value: "",
      // 获取数据次数
      len: 1,
      len1: 1,
      // 顶部标签栏索引
      active: 0,
      // 用户列表
      userList: [],
      // 是否第一次查询
      firstIn: true,
      firstIn1: true
    }
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
  created() {
    this.value = this.$route.query.val
    this.onSearch(this.value)
  },
  methods: {
    // 去往某人主页
    toHome(id) {
      this.$router.push({
        name: 'otherHome',
        query: {
          id
        }
      })
    },
    arr(list) {
      return eval(list)
    },
    // 顶部标签栏切换
    tabChange(val) {
      if(val === 0 && this.firstIn) {
        this.postSearch()
      }
      if(val === 1 && this.firstIn1) {
        this.userRearch()
      }
    },
    // 下拉加载
    onLoad() {
      this.len++
      this.$post('/searchInfo', {
        info: this.value,
        siteList: this.sites,
        length: this.len,
        type: 1
      }).then(res => {
        if(res.success) {
          this.isLoading = false
          this.loading = false
          this.postList.push.apply(this.postList, res.list)
          if(res.list.length < 10) {
            this.finished = true
          }
        }
      })
    },
    onLoad1() {
      this.len1++
      this.$post('/searchInfo', {
        info: this.value,
        length: this.len1,
        type: 2
      }).then(res => {
        if(res.success) {
          this.isLoading = false
          this.loading1 = false
          this.userList.push.apply(this.userList, res.list)
          if(res.list.length < 10) {
            this.finished1 = true
          }
        }
      })
    },
    // 获取动态列表
    postSearch() {
      this.$post('/searchInfo', {
        info: this.value,
        siteList: this.sites,
        length: 1,
        type: 1
      }).then(res => {
        if(res.success) {
          this.isLoading = false
          this.loading = false
          this.len = 1
          this.firstIn = false
          this.postList = res.list
          this.finished = false
          if(res.list.length < 10) {
            this.finished = true
          }
        }
      })
    },
    onSearch(val) {
      this.firstIn = true
      this.firstIn1 = true
      if(val !== "") {
        this.value = val
        this.$store.commit('setSearchValue', val)
      } else {
        this.$toast.fail("请输入搜索信息")
        return false
      }
      if(this.active === 0) {
        this.postSearch()
      } else {
        this.userRearch()
      }
    },
    // 获取用户列表
    userRearch() {
      this.$post('/searchInfo', {
        info: this.value,
        length: 1,
        type: 2
      }).then(res => {
        if(res.success) {
          this.isLoading = false
          this.loading1 = false
          this.len1 = 1
          this.firstIn1 = false
          this.userList = res.list
          this.finished = false
          if(res.list.length < 10) {
            this.finished1 = true
          }
        }
      })
    },
    // 返回
    leftClick() {
      this.$router.go(-1)
      this.$store.commit('setSearchValue', "")
    },
    // // 搜索
    // onSearch() {
    //   this.$post('/searchInfo', {
    //     info: this.sValue,
    //     siteList: this.sites
    //   }).then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.searchPage {
  .header {
    line-height: 46px;
    /deep/ .van-search {
      padding: 6px;
    }
  }
  /deep/ .van-tab__pane {
    height: calc(100vh - 90px);
    overflow: auto;
  }
  .coList {
    /deep/ .van-pull-refresh__track {
      min-height: calc(100vh - 90px)
    }
  }
  .userBox {
    padding: 0 10px;
    .title {
      height: 60px;
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
  }
}
</style>