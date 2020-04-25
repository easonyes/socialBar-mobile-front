<template>
    <div class="header">
        <van-nav-bar
            :title="title"
            :left-text="leftText"
            left-arrow
            :right-text="rText"
            @click-left="leftClick"
            @click-right="rightClick"
        >
            <van-icon v-if="rIcon" :name="rIcon" slot="left" />
            <van-dropdown-menu v-if="options.length > 0"  slot="right" >
                <van-dropdown-item v-model="rChoose" @change="siteChange" :options="options"/>
            </van-dropdown-menu>
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    props: {
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
        }
    },
    data() {
        return {
          rChoose: this.$store.state.currentSite
        }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      siteChange(val) {
        this.$store.commit('changeCurrentSite', val)
      },
      onClickRight() {
        if (this.rText === "验证码登录") {
          this.$router.push("/emLogin")
        }
        if (this.rText === "密码登录") {
          this.$router.push("/login")
        }
      }
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
</style>