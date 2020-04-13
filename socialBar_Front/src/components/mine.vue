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
        <div class="sName" @click="changeAvatar = true">为什么要想名字</div>
      </div>
      <div class="mainInfo">
        <div>
          <div>3</div>
          <div>粉丝</div>
        </div>
        <div>
          <div>20</div>
          <div>关注</div>
        </div>
        <div>
          <div>20</div>
          <div>动态</div>
        </div>
      </div>
    </div>
    <div class="changeAvatar" @click="changeAvatar = false" v-if="changeAvatar">
      <van-icon style="position: absolute;top: 15px;left: 20px;" color="#fff" size="20px"  name="cross" />
      <img class="showImg" :src="showImg" alt="">
      <!-- <van-button class="changeBtn" @click.stop="" type="default">更换头像</van-button>
      <input class="js_upFile cover1" @click.stop @change="newImg" type="file" name="cover" accept="image/*"/> -->
      <div @click.stop="">
        <van-uploader :after-read="afterRead" image-fit="cover" v-model="fileList" :preview-image="false">
          <van-button class="changeBtn"  type="default">更换头像</van-button>
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
  methods: {
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
            localStorage.setItem('avatar', res.avatar)
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
        
      }
    }
    .mainInfo {
      display: flex;
    }
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