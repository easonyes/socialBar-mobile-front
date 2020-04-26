<template>
  <div style="min-height: 100vh; background: rgb(222, 220, 220)">
    <Header rIcon :leftClick="leftClick" title="账号资料" rText="保存" :rightClick="rightClick"></Header>
    <van-cell-group style="margin-top: 20px;">
      <van-field v-model="baseInfo.name" label="用户昵称" readonly @click="beforeNameChange" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="baseInfo.name" label="生日" input-align="right" is-link placeholder="请输入用户名" />
      <van-datetime-picker
        v-model="baseInfo.birthday"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <!-- <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" /> -->
    </van-cell-group>
    <van-cell-group style="margin-top: 20px;">
      <!-- <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" /> -->
    </van-cell-group>
    <van-popup v-model="nameChangeShow" :style="{ width: '100%' }">
      <van-field style="margin: 10px 0;" v-model="name" placeholder="请输入用户名" />
      <div style="margin: 20px 0">
        <van-button type="default" style="margin-right: 10px;" @click="nameChangeShow = false">取消</van-button>
        <van-button type="primary" style="margin-left: 10px" @click="changeName">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 更改昵称弹框
      nameChangeShow: false,
      // 生日最小时间
      minDate: new Date(1900, 0, 1),
      // 生日最大时间
      maxDate: new Date(),
      // 基础信息编辑
      infoShow: false,
      // 基础信息
      baseInfo: {
        // 用户昵称
        name: localStorage.getItem('name'),
        birthday: new Date(2000, 0, 1)
      },
      // 更改昵称
      name: ''
    }
  },
  methods: {
    // 点击更换昵称
    beforeNameChange() {
      this.nameChangeShow = true
    },
    // 点击头部左侧
    leftClick() {
      this.$router.go(-1)
    },
    // 点击保存
    rightClick() {

    },
    changeName() {
      if (this.name === this.baseInfo.name) {
        this.$toast.fail('请不要设置相同的昵称')
        return false
      }
      this.$post('/updateStu', {
        type: 1,
        name: this.name
      }).then(res => {
        this.$mess(res)
        if (res.success) {
          this.baseInfo.name = this.name
          localStorage.setItem('name', this.name)
          this.nameChangeShow = false
          this.name = ''
        }
      })
    }
  }
}
</script>

<style>

</style>