<template>
  <div class="wrap">
    <van-tabs v-model="active" swipeable @change="tabChange">
      <van-tab title="推荐">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- <div>刷新次数: {{ count }}</div> -->
          <van-list
            v-model="loading0"
            :finished="finished0"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad0"
          >
            <div v-for="item in postList0" :key="item.id">
              <postBox :uId="item.userId" :id="item.id" :avatar="item.avatar" :city="item.createPlace" :createTime="item.createTime"
                :imgs="arr(item.imgs)" :content="item.content" :currentSchool="item.currentSchool"
                :nickName="item.userName" :gender="item.gender" :currentEducation="item.currentEducation"
                :goodNum="item.likes" :commentNum="item.comments" :starNum="item.stars" :shareNum="item.forwards"
                :stared="item.stared" :liked="item.liked" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="热门">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- <div>刷新次数: {{ count }}</div> -->
          <van-list
            v-model="loading1"
            :finished="finished1"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad1"
          >
            <div v-for="item in postList1" :key="item.id">
              <postBox :uId="item.userId" :id="item.id" :avatar="item.avatar" :city="item.createPlace" :createTime="item.createTime"
                :imgs="arr(item.imgs)" :content="item.content" :currentSchool="item.currentSchool"
                :nickName="item.userName" :gender="item.gender" :currentEducation="item.currentEducation"
                :goodNum="item.likes" :commentNum="item.comments" :starNum="item.stars" :shareNum="item.forwards"
                :stared="item.stared" :liked="item.liked" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="实时">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- <div>刷新次数: {{ count }}</div> -->
          <van-list
            v-model="loading2"
            :finished="finished2"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad2"
          >
            <div v-for="item in postList2" :key="item.id">
              <postBox :uId="item.userId" :id="item.id" :avatar="item.avatar" :city="item.createPlace" :createTime="item.createTime"
                :imgs="arr(item.imgs)" :content="item.content" :currentSchool="item.currentSchool"
                :nickName="item.userName" :gender="item.gender" :currentEducation="item.currentEducation"
                :goodNum="item.likes" :commentNum="item.comments" :starNum="item.stars" :shareNum="item.forwards"
                :stared="item.stared" :liked="item.liked" />
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
      avatar: localStorage.getItem('avatar'),
      // 顶部标签栏
      topItems: [
        {text: "推荐", value: "1"},
        {text: "热门", value: "2"},
        {text: "实时", value: "3"},
      ],
      // 当前选中顶部标签
      active: this.$store.state.topTab,
      // 下拉刷新
      isLoading: false,
      // 下拉次数
      count: 0,
      // 推荐动态列表
      postList0: [],
      // 热门动态列表
      postList1: [],
      // 实时动态列表
      postList2: [],
      // 滚动条位置
      scrollTop: '',
      // 下滑加载
      loading0: false,
      loading1: false,
      loading2: false,
      // 完成浏览
      finished0: false,
      finished1: false,
      finished2: false,
    }
  },
  computed: {
    // 当前站点
    currentSite() {
      return this.$store.state.currentSite
    }
  },
  created() {
    console.log(this.active)
    if ((this.active === 0 && this.$store.state.firstIn0) || (this.active === 1 && this.$store.state.firstIn1) || (this.active === 2 && this.$store.state.firstIn2)) {
      this.init()
      this.$store.commit('secondIn', this.active)
    }
  },
  mounted() {},
  watch: {
    currentSite(val) {
      console.log(val)
      this.init()
    }
  },
  beforeRouteLeave (to, from, next) {
    //保存滚动条元素div的scrollTop值
    this.scrollTop = document.getElementsByClassName('van-tab__pane')[this.active].scrollTop
    next()
  },
	beforeRouteEnter (to, from, next) {
    next(vm => {
      // 为div元素重新设置保存的scrollTop值
      document.getElementsByClassName('van-tab__pane')[vm.active].scrollTop = vm.scrollTop
    })
	},
  methods: {
    onLoad0() {
      console.log('还要加载')
      let id = this['postList' + this.active].length === 0 ? '' : this['postList' + this.active][this['postList' + this.active].length-1].id
      this.init(id)
    },
    onLoad1() {
      console.log('还要加载')
      let id = this['postList' + this.active].length === 0 ? '' : this['postList' + this.active][this['postList' + this.active].length-1].id
      let hotValue = this['postList' + this.active].length === 0 ? '' : this['postList' + this.active][this['postList' + this.active].length-1].hotValue
      this.init(id, hotValue)
    },
    onLoad2() {
      console.log('还要加载')
      let id = this['postList' + this.active].length === 0 ? '' : this['postList' + this.active][this['postList' + this.active].length-1].id
      this.init(id)
    },
    arr(str) {
      return eval(str)
    },
    // 上部索引改变
    tabChange(val) {
      this.$store.commit('setTopTab', val)
      if ((this.active === 0 && this.$store.state.firstIn0) || (this.active === 1 && this.$store.state.firstIn1) || (this.active === 2 && this.$store.state.firstIn2)) {
        this.init()
        this.$store.commit('secondIn', this.active)
      }
    },
    // 获取动态列表
    init(id, hotValue) {
      this.$get('postList', {
        type: this.active,
        site: this.currentSite,
        hotValue: hotValue,
        lastId: id
      }).then(res => {
        if(res.data.success) {
          // this.$toast('刷新成功')
          this.isLoading = false
          if (id) {
            this['postList' + this.active].push.apply(this['postList' + this.active], res.data.postList)
            this['loading' + this.active] = false
            if (res.data.postList.length < 10) {
              this['finished' + this.active] = true
            }
          } else {
            this['loading' + this.active] = false
            this['finished' + this.active] = false
            this['postList' + this.active] = res.data.postList
          }
        } else {
          this.$mess(res.data)
        }
      })
    },
    onRefresh() {
      this.init()
    }
  }
}
</script>

<style lang="less">
 .van-tabs__content {
  /deep/
  .van-tab__pane {
    height: calc(100vh - 140px);
    overflow: auto;
  }
}
/deep/ .van-pull-refresh__track {
  height: 400px;
}
</style>