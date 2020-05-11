<template>
  <div class="starList">
    <div class="fanBox">
      <van-list
        class="listBox"
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in starList" @click="toHome(item.id)" :key="item.id">
          <div class="title">
            <van-image
              round
              image-fit="cover"
              width="40px"
              height="40px"
              :src="item.avatar"
            />
            <div class="info">
              <div>
                <div class="firstLine">
                  <div class="nickName" >{{item.nickname}}</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 懒加载
      loading: false,
      // 是否加载全部完成
      finished: false,
      // 粉丝列表
      starList: [],
    }
  },
  mounted() {
    this.getStarList()
  },
  methods: {
    // 去往某人主页
    toHome(id) {
      this.$router.push({
        name: 'chat',
        query: {
          id: localStorage.getItem('id'),
          name: localStorage.getItem('name'),
          avatar: localStorage.getItem('avatar')
        }
      })
    },
    // 下拉加载
    onLoad() {
      this.getStarList(this.starList[this.starList.length - 1].id)
    },
    // 获取关注列表
    getStarList(lastId) {
      this.$get('/getStarList', {
        userId: localStorage.getItem('id')
      }).then(res => {
        if(res.data.success) {
          if(lastId) {
            this.starList.push.apply(this.starList, res.data.starList)
          } else {
            this.starList = res.data.starList
          }
          if(res.data.starList.length < 10) {
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
.starList {
  .header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .fanBox {
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