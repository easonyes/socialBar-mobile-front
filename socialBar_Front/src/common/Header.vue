<template>
    <div class="header">
      <van-nav-bar
        :title="title"
        :left-text="leftText"
        :left-arrow="back"
        :right-text="rText"
        @click-left="leftClick"
        @click-right="rightClick"
      >
        <van-icon v-if="rIcon" :name="rIcon" slot="left" />
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" v-if="search" slot="title" />
        <van-dropdown-menu v-if="options.length > 0"  slot="right" >
          <van-dropdown-item v-model="rChoose" @change="siteChange" :options="options"/>
        </van-dropdown-menu>
      </van-nav-bar>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: {
      back: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '贴吧'
      },
      rIcon: {
        type: String,
        default: ''
      },
      rText: {
        type: String,
        default: ""
      },
      leftText: {
      type: String,
      default: ''
      },
      options: {
        type: Array,
        default: () => []
      },
      leftClick: {
        type: Function,
        default: () => {}
      },
      rightClick: {
        type: Function,
        default: () => {}
      },
      // 是否需要搜索栏
      search: {
        type: Boolean,
        default: false
      },
      sValue: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        // 当前站点
        rChoose: this.$store.state.currentSite,
        // 搜索值
        value: this.searchValue,
        // 站点列表
        siteList: JSON.parse(localStorage.getItem('siteList')),
      }
    },
    watch: {
      // sValue(val) {
      //   this.value = val
      // },
      // searchValue(val) {
      //   this.value = val
      // }
    },
    mounted() {
    },
    computed: {
      ...mapState([
        'searchValue',
      ]),
    },
    methods: {
      // 更改站点
      siteChange(val) {
        this.$store.commit('changeCurrentSite', val)
        this.$post('/changeSite', {
          site: val
        }).then(res => {
          if (res.success) {
            localStorage.setItem('currentSite', val)
          }
        })
      },
      // 确定搜索
      onSearch(val) {
        this.$emit("onSearch", val)
        this.value = ""
      },
    }
}
</script>

<style lang="less" scoped>
.header {
    line-height: 46px;
}
/deep/ .van-ellipsis {
    text-overflow:ellipsis;
}
/deep/ .van-dropdown-menu {
  height: 46px;
  width: 100%;
}
/deep/ .van-search {
  padding: 6px;
}
/deep/ .van-dropdown-menu__bar {
  height: 46px;
  box-shadow: none;
}
</style>