<template>
  <div>
        <Header title="注册"/>
        <img src="../assets/logo.png">
        <div class="loginBox">
            <CodeBox @emailBlur="emailBlur" @codeBlur="codeBlur" />
            <!-- <van-field
                v-model="email"
                :left-icon="nameIcon"
                placeholder="请输入您的邮箱"
                required
            />
            <div class="codeBox">
                <van-field
                    class="condIn"
                    v-model="code"
                    :left-icon="nameIcon"
                    placeholder="请输入验证码"
                    required
                    type="digit"
                />
                <van-button class="codeBtn" @click="getCode" v-if="!clicked" type="primary">获取验证码</van-button>
                <van-button class="codeBtn" v-if="clicked && !loading" disabled type="primary">{{reSec}}<span class="label">重新获取</span></van-button>
                <van-button class="codeBtn" loading  v-if="loading" type="primary" loading-text="加载中..." />
            </div> -->
            <div class="tips"><span style="color: red">*</span>温馨提示：若账号未注册，登录时将会自动注册</div>
            <van-button class="loginBtn" @click="register" type="primary">注&nbsp;&nbsp;册</van-button>
        </div>
        <div class="textBtns">
            <div class="textBtn" @click="toLogin">已注册，去登录</div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            code: "",
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
        getCode() {
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
                            this.reSec-=1
                            if (this.reSec === 0) {
                                this.clicked = false
                                this.reSec = 60
                            }
                        }, 1000)
                        // this.$router.push('/setPwd')
                    } else {
                        this.$toast.fail("获取验证码失败，请稍后重试！")
                        this.clicked = false
                    }
                })
            } else {
                this.$toast.fail('邮箱格式有误！');
                return false
            }
            
        },
        register() {
            if (!this.email) {
                this.$toast.fail('请输入您的邮箱！');
                return false
            }
            if (!this.code) {
                this.$toast.fail("请输入验证码！")
            }
            this.$post('/emailValidate', {
                email: this.email,
                code: this.code,
                type: "1"
            }).then(res => {
                if (res.success) {
                    this.$router.push({
                        name: "setPwd",
                        params: {
                            type: 2,
                            email: this.email,
                            code: this.code
                        }
                    })
                }
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