<template>
  <div style="min-height: 100vh; background: rgb(222, 220, 220)">
    <Header rIcon :leftClick="leftClick" title="账号资料" rText="保存" :rightClick="rightClick"></Header>
    <van-cell-group style="margin-top: 20px;">
      <van-field v-model="baseInfo.name" label="用户昵称" readonly @click="beforeNameChange" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="baseInfo.birthday" label="生日" @click="beforeBirChange" input-align="right" is-link placeholder="请选择您的生日" />
      <van-field v-model="baseInfo.age" label="年龄" input-align="right" is-link readonly placeholder="不显示年龄" />
      <van-field :value="baseInfo.genderShow" label="性别" @click="befGenChange" input-align="right" is-link readonly placeholder="不显示年龄" />
      <!-- <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
      <van-field v-model="name" label="用户昵称" input-align="right" is-link placeholder="请输入用户名" />
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
    <van-popup v-model="birthdayChange" position="bottom" :style="{ width: '100%' }">
      <van-datetime-picker
        v-model="birthday"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birConfirm"
        @cancel="birCancel"
      />
    </van-popup>
    <van-popup v-model="genderChange" position="bottom" :style="{ width: '100%' }">
      <van-picker
        :columns="columns"
        :default-index="baseInfo.gender"
        show-toolbar
        title="标题"
        @cancel="genCancel"
        @confirm="genConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 更改性别选项
      columns: ['隐藏', '男', '女'],
      // 更改性别弹框
      genderChange: false,
      // 更改生日弹框
      birthdayChange: false,
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
        birthday: '',
        age: '',
        genderShow: '隐藏',
        gender: 0
      },
      // 更改昵称
      name: '',
      birthday:new Date(2000, 0, 1)
    }
  },
  mounted() {
    this.$get('/getUserInfo').then(res => {
      console.log(res)
    })
  },
  methods: {
    genCancel() {
      this.genderChange = false
    },
    genConfirm(val, index) {
      this.baseInfo.genderShow = val
      this.baseInfo.gender = index
      this.genderChange = false
    },
    // 点击更改性别
    befGenChange() {
      this.genderChange = true
    },
    // 点击更改生日
    beforeBirChange() {
      this.birthdayChange = true
    },
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
      this.$post('/updateStu', {
        type: 2,
        birthday: this.baseInfo.birthday,
        age: this.baseInfo.age,
        gender: this.baseInfo.gender
      }).then(res => {
        this.$mess(res)
        if(res.success) {
          this.$router.go(-1)
        }
      })
    },
    birConfirm(val) {
      this.baseInfo.birthday = val.toLocaleDateString().replace(/\//g, "-")
      this.birthdayChange = false
      this.baseInfo.age = this.sGetAge(val)
      // console.log(val.toLocaleDateString())
    },
    birCancel() {
      this.birthdayChange = false
    },
    // 获取年龄
    sGetAge(bir){
      var returnAge
      var birthYear = bir.getFullYear()
      var birthMonth = bir.getMonth() + 1
      var birthDay = bir.getDate()
      console.log(birthYear, birthMonth, birthDay)

      let d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if(nowYear == birthYear){
          returnAge = 0;//同年 则为0岁
      }
      else{
          var ageDiff = nowYear - birthYear  //年之差
          if(ageDiff > 0){
              if(nowMonth == birthMonth) {
                  var dayDiff = nowDay - birthDay;//日之差
                  if(dayDiff < 0) {
                    returnAge = ageDiff - 1
                  }
                  else {
                    returnAge = ageDiff
                  }
              }
              else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0) {
                  returnAge = ageDiff - 1
                }
                else {
                  returnAge = ageDiff
                }
              }
          }
          else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
          }
      }
      return returnAge;//返回周岁年龄
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