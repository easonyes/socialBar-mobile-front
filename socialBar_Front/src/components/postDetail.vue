<template>
  <div class="postDetail">
    <Header class="header" back title="详情" :leftClick="leftClick" />
    <div class="contentBox">
      <postBox v-if="showCard" :uId="postInfo.userId" :commentClick="commentClick" detail :id="postInfo.id" :avatar="postInfo.avatar" :city="postInfo.createPlace" :createTime="postInfo.createTime"
        :imgs="arr(postInfo.imgs)" :content="postInfo.content" :currentSchool="postInfo.currentSchool"
        :nickName="postInfo.userName" :gender="postInfo.gender" :currentEducation="postInfo.currentEducation"
        :goodNum="postInfo.likes" :commentNum="postInfo.comments" :starNum="postInfo.stars" :shareNum="postInfo.forwards"
        :stared="postInfo.stared" :liked="postInfo.liked" :followed="postInfo.followed" />
      <div class="commentBox" @click="commentClick1">
        <div class="commentDiv" v-for="(item, index) in postInfo.pComments" :key="item.id">
          <div class="title">
            <van-image
              round
              image-fit="cover"
              width="40px"
              height="40px"
              :src="item.avatar"
            />
            <div class="info">
              <div class="firstLine">
                <div class="stuInfo">
                  <div class="nickName">{{item.nickName}}</div>
                  <div class="gender boy" v-if="item.gender == 1">♂</div>
                  <div class="gender girl" v-if="item.gender == 2">♀</div>
                  <div class="edu">{{ education(item.currentEducation) }}</div>
                </div>
                <div style="display: flex; align-items: center">
                  <div :ref="'likeBtn' + item.id" @click="likeClick(index, item.id, item.liked)" style="display: flex">
                    <van-icon name="good-job-o" style="line-height: 26px;" ></van-icon>
                    <span class="num"  style="font-size: 14px; margin-left: 4px">{{ item.likes == 0 ? "" : item.likes }}</span>
                  </div>
                  <div class="dislikeBox" :ref="'dislikeBtn' + item.id" @click="dislikeClick(index, item.id, item.disliked)"  style="display: flex">
                    <van-icon name="good-job-o" style="line-height: 26px;"  class="dislike"></van-icon>
                    <span style="font-size: 14px; margin-left: 4px">{{ item.dislikes == 0 ? "" : item.dislikes }}</span>
                  </div>
                </div>
              </div>
              <div class="secondLine">
                <div>{{ item.time }}</div>
              </div>
            </div>
          </div>
          <div class="commentContent" @click.stop="replay(item.id, item.nickName, item.formUser)">
            <div>{{ item.content }}</div>
            <div class="replayLine" v-show="item.children == 0">回复</div>
            <div class="replayLine" v-show="item.children != 0" @click.stop="replayToCom(index, item.id, item.nickName, item.formUser)">查看{{item.children}}条回复></div>
          </div>
        </div>
        <div v-if="postInfo.pComments.length === 0">
          <div>还没有回复哦，快来回复吧！</div>
        </div>
      </div>
    </div>
    <div class="bottomLine">
      <van-field
        v-model="myComment"
        ref="commentInput"
        left-icon="edit"
        :placeholder="placeholder">
        <template #button>
          <van-button size="small" @click="comment" type="primary">发表</van-button>
        </template>
      </van-field>
    </div>
    <van-popup
      class="replayPop"
      v-model="replayShow"
      v-if="postInfo.pComments.length !== 0"
      position="bottom"
      round
      :style="{ height: '90%' }">
      <div class="replayHeader">
        {{ postInfo.pComments[reIndex].nickName }}的回复
      </div>
      <div class="mainComment">
        <div class="title">
          <van-image
            round
            image-fit="cover"
            width="40px"
            height="40px"
            :src="postInfo.pComments[reIndex].avatar"
          />
          <div class="info">
            <div class="firstLine">
              <div class="stuInfo">
                <div class="nickName">{{postInfo.pComments[reIndex].nickName}}</div>
                <div class="gender boy" v-if="postInfo.pComments[reIndex].gender == 1">♂</div>
                <div class="gender girl" v-if="postInfo.pComments[reIndex].gender == 2">♀</div>
                <div class="edu">{{ education(postInfo.pComments[reIndex].currentEducation) }}</div>
              </div>
              <div style="display: flex; align-items: center">
                <div ref="mainLike" @click="likeClick(reIndex, postInfo.pComments[reIndex].id, postInfo.pComments[reIndex].liked)" style="display: flex">
                  <van-icon name="good-job-o" style="line-height: 26px;" ></van-icon>
                  <span class="num"  style="font-size: 14px; margin-left: 4px">{{ postInfo.pComments[reIndex].likes == 0 ? "" : postInfo.pComments[reIndex].likes }}</span>
                </div>
                <div class="dislikeBox" ref="mainDislike" @click="dislikeClick(reIndex, postInfo.pComments[reIndex].id, postInfo.pComments[reIndex].disliked)"  style="display: flex">
                  <van-icon name="good-job-o" style="line-height: 26px;"  class="dislike"></van-icon>
                  <span style="font-size: 14px; margin-left: 4px">{{ postInfo.pComments[reIndex].dislikes == 0 ? "" : postInfo.pComments[reIndex].dislikes }}</span>
                </div>
              </div>
            </div>
            <div class="secondLine">
              <div>{{ postInfo.pComments[reIndex].time }}</div>
            </div>
          </div>
        </div>
        <div class="commentContent"
        @click="replayToCom(reIndex, postInfo.pComments[reIndex].id, postInfo.pComments[reIndex].nickName, postInfo.pComments[reIndex].formUser, postInfo.pComments[reIndex].id)">
          <div>{{ postInfo.pComments[reIndex].content }}</div>
        </div>
      </div>
      <div style="height: 8px; background: #d8c9c9"></div>
      <div style="text-align: left; padding: 8px 10px 15px">{{postInfo.pComments[reIndex].children}}条回复</div>
      <van-list
        class="reList"
        v-model="loading1"
        :finished="finished1"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad1">
        <div class="reDiv" v-for="(item, index) in replayList" :key="item.id">
          <div class="title">
            <van-image
              round
              image-fit="cover"
              width="40px"
              height="40px"
              :src="item.avatar"
            />
            <div class="info">
              <div class="firstLine">
                <div class="stuInfo">
                  <div class="nickName">{{item.nickName}}</div>
                  <div class="gender boy" v-if="item.gender == 1">♂</div>
                  <div class="gender girl" v-if="item.gender == 2">♀</div>
                  <div class="edu">{{ education(item.currentEducation) }}</div>
                </div>
                <div style="display: flex; align-items: center">
                  <div :ref="'likeBtn' + item.id" @click="likeClick(index, item.id, item.liked, index)" style="display: flex">
                    <van-icon name="good-job-o" style="line-height: 26px;" ></van-icon>
                    <span class="num"  style="font-size: 14px; margin-left: 4px">{{ item.likes == 0 ? "" : item.likes }}</span>
                  </div>
                  <div class="dislikeBox" :ref="'dislikeBtn' + item.id" @click="dislikeClick(index, item.id, item.disliked, index)"  style="display: flex">
                    <van-icon name="good-job-o" style="line-height: 26px;"  class="dislike"></van-icon>
                    <span style="font-size: 14px; margin-left: 4px">{{ item.dislikes == 0 ? "" : item.dislikes }}</span>
                  </div>
                </div>
              </div>
              <div class="secondLine">
                <div>{{ item.time }}</div>
              </div>
            </div>
          </div>
          <div class="commentContent" @click.stop="replayToStu(item.nickName, item.formUser)">
            <div><span v-if="item.toUser">回复 <span style="color: blue" @click="toStuHome(item.toUser)">{{ item.toName }}</span> :</span>{{ item.content }}</div>
          </div>
        </div>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 评论内容
      myComment: '',
      // 控制获取数据再显示
      showCard: false,
      // 回复的评论
      reIndex: 0,
      // 动态信息
      postInfo: {
        pComments: [{
          nickName: ''
        }]
      },
      // 点赞样式
      likeStyle: {},
      // 点踩样式
      dislikeStyle: {},
      // 评论框图提示
      placeholder: "评论一下",
      // 是否回复
      replayStatus: false,
      // 回复评论
      toComment: '',
      // 回复用户
      toStudent: '',
      // 回复弹出框
      replayShow: false,
      // 回复列表
      replayList: [],
      // 回复列表加载
      loading1: false,
      // 回复列表完成
      finished1: false,
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
  },
  watch: {
    // 'postInfo.pComents[reIndex].liked': {
    //   handler: function (val, oldVal) {
    //     console.log(val)
    //    },
		// 	// immediate这个属性需要加上，代表该回调将会在侦听开始之后被立即调用
    //   immediate: true
    // }
    replayShow(val) {
      if(!val) {
        this.toComment = ''
        this.replayStatus = false
      } else {
        this.finished1 = false
      }
    }
  },
  methods: {
    // 去往别人的主页
    toStuHome() {},
    // 回复列表加载
    onLoad1() {
      this.getReplayList(this.toComment, this.replayList[this.replayList.length-1].id)
    },
    // 评论
    commentClick() {
      this.placeholder = "评论一下"
      this.$refs.commentInput.focus()
    },
    // 回复
    replay(id, nickName, formUser) {
      this.placeholder = `回复 ${nickName}`
      this.replayStatus = true
      this.$refs.commentInput.focus()
      this.toComment = id
    },
    // 回复评论
    replayToCom(index, id, nickName, formUser, rep) {
      this.reIndex = index
      this.toComment = id
      this.replayShow = true
      this.replayStatus = true
      this.toStudent = ""
      if(rep) {
        this.$refs.commentInput.focus()
      }
      this.getReplayList(id)
      this.$nextTick(() => {
        if (this.postInfo.pComments[this.reIndex].liked) {
          this.$refs['mainLike'].className += " likeStyle"
        }
        if (this.postInfo.pComments[this.reIndex].disliked) {
          this.$refs['mainDislike'].className += " dislikeStyle"
        }
        this.$watch(
          function () { // 第一个函数就是处理你要监听的属性，只要将其return出去就行
            return this.postInfo.pComments[this.reIndex].liked;
          },
          function (old, valold) {
            if(old) {
              this.$refs['mainLike'].className += " likeStyle"
              if(!this.postInfo.pComments[this.reIndex].disliked) {
                this.$refs['mainDislike'].className = this.$refs['mainDislike'].className.replace(/dislikeStyle/, "")
              }
            } else {
              this.$refs['mainLike'].className = this.$refs['mainLike'].className.replace(/likeStyle/, "")
            }
          }
        )
        this.$watch(
          function () { // 第一个函数就是处理你要监听的属性，只要将其return出去就行
            return this.postInfo.pComments[this.reIndex].disliked;
          },
          function (old, valold) {
            if(old) {
              this.$refs['mainDislike'].className += " dislikeStyle"
              if(!this.postInfo.pComments[this.reIndex].liked) {
                this.$refs['mainLike'].className = this.$refs['mainLike'].className.replace(/likeStyle/, "")
              }
            } else {
              this.$refs['mainDislike'].className = this.$refs['mainDislike'].className.replace(/dislikeStyle/, "")
            }
          }
        )
      })
    },
    // 回复用户
    replayToStu(nickName, formUser) {
      this.toStudent = formUser
      this.replayStatus = true
      this.placeholder = `回复 ${nickName}`
      this.$refs.commentInput.focus()
    },
    // 获取回复列表
    getReplayList(id, lastId) {
      this.$get('/replayDetail', {
        id: this.postInfo.id,
        toComment: id,
        lastId
      }).then(res => {
        if(res.data.success) {
          this.loading1 = false
          if(lastId) {
            this.replayList.push.apply(this.replayList, res.data.replayList)
          } else {
            this.replayList = res.data.replayList
          }
          this.$nextTick(() => {
            this.replayList.forEach(item => {
              if(item.liked) {
                this.$refs['likeBtn' + item.id][0].className += " likeStyle"
              }
              if(item.disliked) {
                this.$refs['dislikeBtn' + item.id][0].className += " dislikeStyle"
              }
            })
          })
          if(res.data.replayList.length < 10) {
            this.finished1 = true
          }
        }
      })
    },
    // 重置
    commentClick1() {
      this.placeholder = "评论一下"
    },
    // 点赞
    likeClick(index, id, liked, rep) {
      let co = this.postInfo.pComments[index]
      if(typeof(rep) != 'undefined') {
        co = this.replayList[index]
      }
      this.$post('/likeComment', {
        id,
        type: liked ? '2' : '1'
      }).then(res => {
        console.log(res)
      })
      if(!liked) {
        this.$refs['likeBtn' + id][0].className += " likeStyle"
        co.likes++
        if(co.disliked) {
          this.$refs['dislikeBtn' + id][0].className = this.$refs['dislikeBtn' + id][0].className.replace(/dislikeStyle/, "")
          co.dislikes--
          co.disliked = false
        }
        co.liked = true
      } else {
        this.$refs['likeBtn' + id][0].className = this.$refs['likeBtn' + id][0].className.replace(/likeStyle/, "")
        co.likes--
        co.liked = false
      }
    },
    // 点踩
    dislikeClick(index, id, disliked, rep) {
      this.$post('/likeComment', {
        id,
        type: disliked ? '4' : '3'
      }).then(res => {
        console.log(res)
      })
      let co = this.postInfo.pComments[index]
      console.log(co)
      if(typeof(rep) != 'undefined') {
        co = this.replayList[index]
      }
      if(!disliked) {
        this.$refs['dislikeBtn' + id][0].className += " dislikeStyle"
        co.dislikes++
        if(co.liked) {
          this.$refs['likeBtn' + id][0].className = this.$refs['likeBtn' + id][0].className.replace(/likeStyle/, "")
          co.likes--
          co.liked = false
        }
        co.disliked = true
      } else {
        this.$refs['dislikeBtn' + id][0].className = this.$refs['dislikeBtn' + id][0].className.replace(/dislikeStyle/, "")
        co.dislikes--
        co.disliked = false
      }
    },
    // 获取动态详情
    getDetail() {
      this.$get('/getPostDetail', {
        id: this.$route.query.id
      }).then(res => {
        if (res.data.success) {
          this.postInfo = res.data.poInfo
          this.showCard = true
          this.$nextTick(() => {
            this.postInfo.pComments.forEach(item => {
              if(item.liked) {
                this.$refs['likeBtn' + item.id][0].className += " likeStyle"
              }
              if(item.disliked) {
                this.$refs['dislikeBtn' + item.id][0].className += " dislikeStyle"
              }
            })
          })
        }
      })
    },
    // 学历转换
    education(val) {
      switch(val) {
        case 1:
          return '专科'
        case 2:
          return '本科'
        case 3:
          return '硕士'
        case 4:
          return '博士'
      }
    },
    // 返回
    leftClick() {
      this.$router.go(-1)
    },
    // 字符转数组
    arr(str) {
      return eval(str)
    },
    comment() {
      let params =  {
        id: this.postInfo.id,
        content: this.myComment,
      }
      if(this.replayStatus) {
        params.type = '2'
        params.toComment = this.toComment
        params.toStudent = this.toStudent
      } else {
        params.type = '1'
      }
      this.$post('/comment', params).then(res => {
        if(res.success) {
          this.getDetail()
          if (this.replayShow) {
            this.getReplayList(this.toComment)
          }
          this.myComment = ""
          this.placeholder = "评论一下"
          this.toStudent = ''
        }
      })
    }
  }
}
</script>

<style lang="less">
.postDetail {
  .header {
    position: fixed;
    z-index: 9;
    width: 100%;
    top: 0;
    left: 0;
  }
  .contentBox {
    margin-top: 46px;
    .commentBox {
      margin-bottom: 51px;
      .commentDiv {
        padding: 10px;
        .title {
          height: 40px;
          display: flex;
          align-items: center;
          .info {
            width: 100%;
            .firstLine {
              display: flex;
              width: 90%;
              justify-content: space-between;
              align-items: center;
              padding: 0 15px;
              line-height: 25px;
              .likeStyle {
                color: blue;
              }
              .dislikeStyle {
                color: rgb(207, 17, 17);
              }
              .stuInfo {
                display: flex;
                .nickName {
                }
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
              .dislike {
                margin-left: 18px;
                transform:rotate(180deg);
                -webkit-transform: rotate(180deg);
              }
            }
            .secondLine {
              display: flex;
              padding: 0 15px;
              font-size: 12px;
              line-height: 15px;
            }
          }
        }
        .commentContent {
          word-wrap:break-word ;
          margin-top: 10px;
          padding-left: 55px;
          text-align: left;
          .replayLine {
            color: #ccc;
            font-size: 14px;
          }
        }
      }
    }
  }
  .bottomLine {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3000;
    /deep/ .van-cell {
      line-height: 30px;
    }
  }
  .replayPop {
    .title {
      height: 40px;
      display: flex;
      align-items: center;
      .info {
        width: 100%;
        .firstLine {
          display: flex;
          width: 90%;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          line-height: 25px;
          .likeStyle {
            color: blue;
          }
          .dislikeStyle {
            color: rgb(207, 17, 17);
          }
          .stuInfo {
            display: flex;
            .nickName {
            }
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
          .dislike {
            margin-left: 18px;
            transform:rotate(180deg);
            -webkit-transform: rotate(180deg);
          }
        }
        .secondLine {
          display: flex;
          padding: 0 15px;
          font-size: 12px;
          line-height: 15px;
        }
      }
    }
    .commentContent {
      word-wrap:break-word ;
      margin-top: 10px;
      padding-left: 55px;
      text-align: left;
      .replayLine {
        color: #ccc;
        font-size: 14px;
      }
    }
    .replayHeader {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      position: fixed;
      width: 100%;
      z-index: 1;
      background: #FFFFFF;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
    .mainComment {
      margin-top: 61px;
      margin-bottom: 10px;
      padding: 0 10px;
    }
    .reList {
      padding: 0 10px;
      margin-bottom: 61px;
      .reDiv {
        margin: 10px 0;
      }
    }
  }
}
</style>