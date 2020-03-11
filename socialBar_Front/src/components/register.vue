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
            <van-button class="loginBtn" @click="register" type="primary">注&nbsp;&nbsp;册</van-button>
        </div>
        <div class="textBtns">
            <div class="textBtn" @click="toLogin">已注册，去登录</div>
        </div>
  </div>
</template>

<script>
import icon from '../assets/img/icon-demo-1126.png'
export default {
    data() {
        return {
            name: 'pk002',
            password: '000000',
            address: 'address',
            birthday: '2020-3-8',
            nickname: 'pk',
            gender: 1,
            nameIcon: icon,
            phone: '133'
        }
    },
    mounted() {},
    methods: {
        register() {
            this.$post('/register', {
                name: this.name,
                password: this.password,
            }).then(res => {
                console.log(res)
            })
        },
        toLogin() {
            this.$router.push('/login')
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
        font-size: 18px;
        height: 40px;
        border-radius: 20px;
    }
}
.textBtns {
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
    display: flex;
    text-align: right;
    flex-direction: column-reverse;
    justify-content: space-between;
}
/deep/ .van-cell  {
    line-height: 28px;
    border-bottom: 1px solid #ebedf0;
    padding: 5px 16px;
}
</style>