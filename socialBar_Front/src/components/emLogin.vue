<template>
  <div>
        <Header title="登录" rText="密码登录" />
        <img src="../assets/logo.png">
        <div class="loginBox">
            <CodeBox @emailBlur="emailBlur" @codeBlur="codeBlur" />
            <div class="tips"><span style="color: red">*</span>温馨提示：若账号未注册，登录时将会自动注册</div>
            <van-button class="loginBtn" @click="login" type="primary">登&nbsp;&nbsp;录</van-button>
        </div>
        <!-- <div class="textBtns">
            <div class="textBtn" @click="toLogin">已注册，去登录</div>
        </div> -->
  </div>
</template>

<script>
import icon from '../assets/img/icon-demo-1126.png'
export default {
    data() {
        return {
            email: "",
            code: "",
            nameIcon: icon,
            clicked: false,
            loading: false,
            reSec: 60,
            timer: null
        }
    },
    mounted() {},
    methods: {
        emailBlur(val) {
            this.email = val
            // console.log(val)
        },
        codeBlur(val) {
            this.code = val
            // console.log(val)
        },
        register() {
            this.code = ""
            if (!this.email) {
                this.$toast.fail('请输入您的邮箱！');
                return false
            }
            if (this.$validate.emailVali(this.email)){
                this.clicked = true
                this.loading = true
                this.$post('/sendEmail', {
                    email: this.email
                }).then(res => {
                    this.loading = false
                    if (res.success) {
                        clearInterval(this.timer)
                        this.timer = setInterval(() => {
                            this.reSec--
                            if (this.reSec === 0) {
                                this.clicked = false
                            }
                        }, 1000)
                        // this.$router.push('/setPwd')
                    }
                })
            } else {
                this.$toast.fail('邮箱格式有误！');
                return false
            }
            
        },
        login() {
            if (!this.email || !this.code) {
                this.$toast.fail("请填写完整")
                return false
            }
            if (!this.$validate.emailVali(this.email)) {
                this.$toast.fail("邮箱格式有误，请重新输入！")
                return false
            }
            this.$post('/emailValidate', {
                email: this.email,
                code: this.code,
                type: "3"
            }).then(res => {
                if(res.success) {
                    // 跳转主页
                    this.$router.replace('/')
                } else {
                    this.$toast.fail(res.result)
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
    .codeBox {
        display: flex;
        margin-top: 20px;
        align-items: center;
        justify-content: space-between;
        .condIn {
            width: 55%;
        }
        .codeBtn {
            margin-left: 20px;
            width: 40%;
            font-size: 16px;
            height: 40px;
            border-radius: 20px;
            .label {
                margin-left: 8px;
                font-size: 14px;
                color: #000;
            }
        }
    }
    .tips {
        width: 100%;
        text-align: center;
        margin-top: 10px;
        font-size: 12px;
        color: #6b6969;
    }
    .loginBtn {
        margin-top: 20px;
        font-size: 18px;
        width: 100%;
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