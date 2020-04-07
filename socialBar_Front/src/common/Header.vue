<template>
    <div class="header">
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            :right-text="rText"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <van-icon v-if="rIcon" :name="rIcon" slot="right" />
            <van-dropdown-menu v-if="options.length > 0"  slot="right" >
                <van-dropdown-item v-model="rChoose" :options="options"/>
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
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            rChoose: "1"
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
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