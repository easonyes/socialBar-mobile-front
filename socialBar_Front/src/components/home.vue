<template>
    <div class="main">
        <Header :title="currentSite" :options="options" />
        <router-view></router-view>
        <van-tabbar v-model="bottomActive" @change="tabChange">
            <van-tabbar-item name="main" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item name="collection" icon="description">收藏</van-tabbar-item>
            <van-tabbar-item name="post" class="upload" icon="plus">发表</van-tabbar-item>
            <van-tabbar-item name="chat" icon="chat-o" info="5">消息</van-tabbar-item>
            <van-tabbar-item name="mine" icon="setting-o" :dot="true">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentSite: "全国热门",
            options: [
                {text: "主站", value: "1"},
                {text: "杭州站", value: "2"},
                {text: "杭州电子科技大学1111111111", value: "3"}
            ],
            // 当前选中的底部标签
            bottomActive: "main"
        }
    },
    methods: {
        tabChange(val) {
            if (val != "post" && this.$route.path.indexOf(val) == -1) {
                this.$router.push("/" + val)
            } else {
                console.log("发表")
            }
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    min-height: 100vh;
    .content {
        min-height: calc(100vh - 60px);
    }
}
.upload {
    /deep/ .van-tabbar-item__icon {
        margin-top: -6px;
        font-size: 26px;
    }
}
/deep/ .van-nav-bar__right {
    max-width: 30%;
}
/deep/ .van-tabs__line {
    z-index: 0;
}
</style>