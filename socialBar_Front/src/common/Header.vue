<template>
    <div class="header">
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <van-icon :name="rIcon" slot="right" />
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
        }
    },
    data() {
        return {

        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onClickRight() {
            console.log('这里是右上角的按钮')
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    height: 60px;
}
</style>