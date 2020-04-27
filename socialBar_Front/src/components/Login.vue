<template>
  <div>
    <Header title="登录" rText="验证码登录" :rightClick="rightClick" />
    <img src="../assets/logo.png">
    <div class="loginBox">
        <van-field
            v-model="email"
            :left-icon="nameIcon"
            placeholder="请输入邮箱"
        />
        <van-field
            style="margin-top: 20px;"
            v-model="password"
            left-icon="idcard"
            placeholder="请输入密码"
        />
        <van-button class="loginBtn" @click="login" type="primary">登&nbsp;&nbsp;录</van-button>
    </div>
    <div class="textBtns">
        <div class="textBtn" @click="toSetPwd">忘记密码？</div>
        <div class="textBtn" @click="toRegister">新用户注册</div>
    </div>
  </div>
</template>

<script>
import icon from '../assets/img/icon-demo-1126.png'
export default {
    data() {
        return {
            email: '',
            password: '',
            nameIcon: icon
        }
    },
    created() {
    },
    methods: {
      rightClick() {
        this.$router.push("/emLogin")
      },
    login() {
        if (!this.email || !this.password) {
          this.$toast.fail('邮箱与密码不能为空！');
          return false
        }
        if (!this.$validate.emailVali(this.email)) {
          this.$toast.fail('邮箱格式有误！');
          return false
        }
        if (this.password.length < 6) {
          this.$toast.fail('请填写正确的密码');
          return false
        }
        this.$post('/login', {
          email: this.email,
          password: this.password
        }).then(res => {
          if (res.success) {
            let result = JSON.parse(res.studentInfo)[0].fields
            console.log(result)
            this.$store.commit('setCurrentSite', result.defaultSite)
            this.$store.commit('setSiteList', result.siteList)
            localStorage.setItem('status', result.status)
            localStorage.setItem('userinfo', JSON.stringify(result))
            localStorage.setItem('avatar', result.avatar)
            localStorage.setItem('id', res.user_id)
            localStorage.setItem('name', result.nickname)
            localStorage.setItem('email', result.email)
            this.$router.replace("/main")
          } else {
            this.$toast.fail(res.result)
          }
        })
      },
      toRegister() {
        this.$router.push('/register')
      },
      toSetPwd() {
        this.$router.push({
          name: "setPwd",
          params: {
            type: 1
          }
        })
      }
    }
}
</script>

<style lang="less" scoped>
.loginBox {
    width: 90%;
    margin-left: 5%;
    .loginBtn {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        font-size: 18px;
        border-radius: 20px;
    }
}
.textBtns {
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
/deep/ .van-cell  {
    line-height: 28px;
    border-bottom: 1px solid #ebedf0;
    padding: 5px 16px;
}
</style>
