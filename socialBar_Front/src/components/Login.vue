<template>
  <div>
    <Header title="登录" rIcon="search" />
    <img src="../assets/logo.png">
    <div class="loginBox">
        <van-field
            v-model="name"
            :left-icon="nameIcon"
            placeholder="请输入用户名"
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
        <div class="textBtn" @click="toRegister">忘记密码？</div>
        <div class="textBtn" @click="toRegister">新用户注册</div>
    </div>
  </div>
</template>

<script>
import icon from '../assets/img/icon-demo-1126.png'
export default {
    data() {
        return {
            name: '',
            password: '',
            nameIcon: icon
        }
    },
    methods: {
        login() {
            this.$post('/login', {
                name: this.name,
                password: this.password
            }).then(res => {
                console.log(res)
            })
        },
        toRegister() {
            this.$router.push('/register')
        }
    }
}
</script>

<style lang="less" scoped>
.loginBox {
    width: 80%;
    margin-left: 10%;
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
