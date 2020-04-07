<template>
  <div>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in topItems" :title="item.text" :key="item.value">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- <div>刷新次数: {{ count }}</div> -->
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
            <div>这里是主页</div>
          </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    data() {
      return {
        // 顶部标签栏
        topItems: [
            {text: "推荐", value: "1"},
            {text: "热门", value: "2"},
            {text: "实时", value: "3"},
        ],
        // 当前选中顶部标签
        active: 0,
        // 下拉刷新
        isLoading: false,
        // 下拉次数
        count: 0
      }
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
                JSON.stringify
            }, 1000);
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