<template>
  <div class="mine">
    <div class="topCard"></div>
    <div class="mainCard">
      <div class="personalInfo">
        <div class="avatar">
          <img class="img" src="https://img.yzcdn.cn/vant/ipad.jpeg" alt="">
        </div>
        <div class="sName">为什么要想名字</div>
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
    <!-- <van-card
      num="2"
      tag="标签"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      origin-price="10.00"
    /> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
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
}
</style>