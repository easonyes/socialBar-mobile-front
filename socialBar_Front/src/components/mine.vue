<template>
  <div class="mine">
    <div class="topCard"></div>
    <div class="mainCard">
      <div class="personalInfo">
        <div @click="changeAvatar = true" class="avatar">
          <van-image
            round
            image-fit="cover"
            width="80px"
            height="80px"
            :src="showImg"
          />
          <!-- <img class="img"  :src="showImg" alt=""> -->
        </div>
        <div class="sName" @click="changeAvatar = true">{{ baseInfo.name }}</div>
        <van-icon @click="infoEdit" name="edit" />
      </div>
      <div class="mainInfo">
        <div @click="showFanList">
          <div>{{ fansNum }}</div>
          <div class="label">粉丝</div>
        </div>
        <div style="height: 30px; border-left: 1px solid #ccc;"></div>
        <div @click="showStarList">
          <div>{{ starsNum }}</div>
          <div class="label">关注</div>
        </div>
        <div style="height: 30px; border-left: 1px solid #ccc;"></div>
        <div @click="showPostList">
          <div>{{ postsNum }}</div>
          <div class="label">动态</div>
        </div>
      </div>
    </div>
    <div class="settings">
      <van-cell :title-style="{ textAlign: 'left' }" is-link :value="isVerified == 1 ? '已认证' : '未认证' " @click="beforeVerify">
        <template #title>
          <span class="custom-title">实名认证</span>
          <van-tag v-show="isVerified == 2" type="danger">游客</van-tag>
          <van-tag v-show="isVerified == 1" type="success">会员</van-tag>
        </template>
      </van-cell>
    </div>
    <van-cell-group style="text-align: left">
      <van-field label-align="left" label="更改密码" readonly @click="changePwd" input-align="right" is-link />
      <van-field label-align="left" label="我的收藏" readonly @click="collection" input-align="right" is-link />
      <!-- <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" /> -->
    </van-cell-group>
    <van-cell-group style="text-align: left; margin-top: 20px;">
      <van-field label="uuid" readonly :value="uId" input-align="right" />
      <van-field v-show="status != 2" label="就读学校" readonly :value="currentSchool" input-align="right" />
      <van-field v-show="status != 2" label="当前学历" readonly :value="currentEducation" input-align="right" />
    </van-cell-group>
    <van-dialog
      v-model="isShow"
      show-cancel-button
      @confirm="verify"
      :beforeClose="beforeClose">
      <van-field
        v-model="idCard"
        label="身份证"
        placeholder="请输入身份证"
      />
    </van-dialog>
    <div class="changeAvatar" @click="changeAvatar = false" v-if="changeAvatar">
      <van-icon style="position: absolute;top: 15px;left: 20px;" color="#fff" size="20px"  name="cross" />
      <img class="showImg" :src="showImg" alt="">
      <!-- <van-button class="changeBtn" @click.stop="" type="default">更换头像</van-button>
      <input class="js_upFile cover1" @click.stop @change="newImg" type="file" name="cover" accept="image/*"/> -->
      <div @click.stop="" v-show="status != 2">
        <van-uploader :after-read="afterRead" image-fit="cover" v-model="fileList" :preview-image="false">
          <van-button class="changeBtn" type="default">更换头像</van-button>
        </van-uploader>
      </div>
    </div>
    <div v-if="imgGot" class="cropper-content">
      <van-icon @click="closeCrop" style="position: absolute;top: 60px;left: 20px;z-index: 1" color="#fff" size="40px"  name="cross" />
      <van-icon @click="crop" style="position: absolute;top: 60px;right: 20px;z-index: 1" color="#fff" size="40px" name="success" />
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
      ></vueCropper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户认证状态
      status: 1,
      // 关注数量
      starsNum: 0,
      // 粉丝数量
      fansNum: 0,
      // 发表动态数量
      postsNum: 0,
      // 就读学校
      currentSchool: "",
      // 用户id
      uId: "",
      // 学历
      education: 1,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      // 基础信息
      baseInfo: {
        // 用户昵称
        name: "",
        birthday: new Date(2000, 0, 1)
      },
      // 认证弹框
      isShow: false,
      // 身份证号
      idCard: '330102199803079679',
      // 是否认证
      isVerified: localStorage.getItem('status'),
      // 更换头像界面
      changeAvatar: false,
      // 显示头像
      showImg: localStorage.getItem('avatar'),
      fileList: [],
      // 截图界面
      imgGot: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: document.body.clientWidth, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
    }
  },
  created() {
  },
  computed: {
    // 当前学历
    currentEducation() {
      switch(this.education) {
        case 4:
          return '博士'
        case 3:
          return '硕士'
        case 2:
          return '本科'
        case 1:
          return '专科'
      }
    }
  },
  mounted() {
    if (this.isVerified != 1) {
      this.$notify({
        message: '实名认证后享受更多功能哦',
        type: 'warning',
        duration: 2000,
      });
    }
    this.getStuInfo()
  },
  methods: {
    // 获取关注列表
    showStarList() {
      if(this.starsNum === 0) {
        this.$toast.fail('还没有关注的人~')
        return false
      }
      this.$router.push({
        name: 'starList',
        query: {
          id: this.uId
        }
      })
    },
    // 获取粉丝列表
    showFanList() {
      if(this.fansNum === 0) {
        this.$toast.fail('还没有人关注~')
        return false
      }
      this.$router.push({
        name: 'fanList',
        query: {
          id: this.uId
        }
      })
    },
    // 获取发表动态列表
    showPostList() {
      if(this.postsNum === 0) {
        this.$toast.fail('还没有发表动态~')
        return false
      }
      this.$router.push({
        name: 'postList',
        query: {
          id: this.uId
        }
      })
    },
    // 获取用户信息
    getStuInfo(){
      this.$get('/getUserInfo').then(res => {
        if(res.data.success) {
          this.starsNum = res.data.studentInfo.starsNum
          this.fansNum = res.data.studentInfo.fansNum
          this.postsNum = res.data.studentInfo.postsNum
          this.uId = res.data.studentInfo.id
          this.baseInfo.name = res.data.studentInfo.nickName
          this.currentSchool = res.data.studentInfo.currentSchool
          this.education = res.data.studentInfo.currentEducation
          this.status = res.data.studentInfo.status
        }
      })
    },
    // 点击更改密码
    changePwd() {
      this.$router.push({
        name: "setPwd",
        params: {
          type: 3
        }
      })
    },
    // 进入收藏
    collection() {
      this.$router.push('/collection')
    },
    // 基础信息编辑
    infoEdit() {
      if (this.isVerified == 1) {
        this.$router.push("/infoEdit")
      } else {
        this.$toast.fail("请先完成您的实名认证哦!")
      }
    },
    // 点击认证
    beforeVerify() {
      if(this.isVerified == 1) {
        this.$notify({
          message: '您已经认证成功啦，快去发表动态吧！',
          type: 'success',
          duration: 2000,
        });
      } else {
        this.isShow = true
      }
    },
    // 实名认证
    verify() {
      if (!this.idCard) {
        this.$toast.fail("身份证号不能为空！")
        return
      }
      let idRes = this.$validate.idCodeValid(this.idCard)
      if (idRes.pass) {
        this.$post('/verify', {
          idCard: this.idCard
        }).then(res => {
          if (res.success) {
            localStorage.setItem('status', 1)
            this.isVerified = 1
            this.isShow = false
            this.$notify({
              message: '实名认证成功！',
              type: 'success',
              duration: 2000,
            });
            this.$post("/login").then(res => {
              if (res.success) {
                let result = JSON.parse(res.studentInfo)[0].fields
                this.$common.localStore(result)
                localStorage.setItem('id', res.user_id)
                this.$store.commit('setCurrentSite', result.defaultSite)
                this.$router.replace("/main")
              }
            })
          } else {
            this.$toast.fail(res.result)
          }
        })
      } else {
        this.$toast.fail(idRes.msg)
      }
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        done(false)
      } else {
        done()
      }
    },
    // 关闭截图
    closeCrop() {
      this.imgGot = false
      this.changeAvatar = true
    },
    // 截图
    crop() {
      this.$refs.cropper.getCropData((data) => {
        // do something
        this.$post('/uploadAvatar', {
          avatar: data.replace(/data:image\/.*;base64,/, '')
          // avatar: file.content
        }).then(res => {
          if (res.success) {
            this.showImg = data
            localStorage.setItem('avatar', res.avatar + "?t=" + Math.random())
            this.imgGot = false
            this.$toast.success(res.result);
          }
        })
      })
    },
    newImg(val, val2, val3, val4) {
      this.showImg = val.target.value
      console.log('val1:', val)
      console.log('val2:', val2)
      console.log('val3:', val3)
      console.log('val4:', val4)
    },
    beforeRead(file) {
      console.log('before', file)
      console.log(file.content)
    },
    afterRead(file) {
      console.log(file)
      // let canvas = document.createElement('canvas') // 创建Canvas对象(画布)
      // let context = canvas.getContext('2d')
      // let img = new Image()
      // img.src = file.content // 指定图片的DataURL(图片的base64编码数据)
      // img.onload = () => {
      //   canvas.width = 300
      //   canvas.height = 300
      //   context.drawImage(img, 0, 0, 300, 300)
      //   file.content = canvas.toDataURL(file.file.type, 0.92) // 0.92为默认压缩质量
      //   // apiUpload(data).then(res => {
      //   //   this.imagePath.push(res.data.reqUrl)
      //   //   Toast('上传成功')
      //   // })
      // }
      this.imgGot = true
      this.option.img = file.content
      this.changeAvatar = false
    },
  }
}
</script>

<style lang="less" scoped>
.mine {
  background-color: rgb(248, 248, 248);
  min-height: calc(100vh - 96px);
  height: 100%;
  .topCard {
    width: 100%;
    height: 180px;
    background: rgb(82, 144, 255)
  }
  .mainCard {
    width: 80%;
    margin-left: 10%;
    margin-top: -100px;
    height: 160px;
    background-color: #fff;
    .personalInfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 15px;
      padding-top: 5px;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        .img {
          width: 80px;
          height: 80px;
          border-radius: 40px;
        }
      }
      .sName {
        // width: 60%;
      }
      /deep/ .van-icon-edit {
        font-size: 24px;
      }
    }
    .mainInfo {
      height: 50px;
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .label {
        font-size: 14px;
        color: rgb(122, 115, 115);
      }
    }
  }
  .settings {
    margin-top: 30px;
  }
  .changeAvatar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000;
    z-index: 2000;
    .showImg {
      margin-top: 15%;
      width: 100vw;
      height: 100vw;
    }
    /deep/ .van-button--default {
      background-color: rgba(255, 255, 255, 0.7);
    }
    // /deep/ .van-uploader__upload {
    //   width: 80vw;
    //   height: 40px;
    //   .van-uploader__upload-icon {
    //     display: none;
    //   }
    // }
    .changeBtn {
      margin-top: 30px;
      width: 80vw;
    }
  }
  .cropper-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000;
  }
}
</style>