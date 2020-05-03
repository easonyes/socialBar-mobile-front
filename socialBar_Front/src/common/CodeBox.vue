<template>
    <div>
        <van-field
            v-model="email"
            :left-icon="nameIcon"
            placeholder="请输入您的邮箱"
            @blur="emailBlur"
            required
        />
        <!-- <van-field
            style="margin-top: 20px;"
            v-model="password"
            left-icon="idcard"
            placeholder="请输入密码"
        /> -->
        <div class="codeBox">
            <van-field
                class="condIn"
                v-model="code"
                :left-icon="nameIcon"
                placeholder="请输入验证码"
                required
                @blur="codeBlur"
                type="digit"
            />
            <van-button class="codeBtn" @click="getCode" v-if="!clicked" type="primary">获取验证码</van-button>
            <van-button class="codeBtn" v-if="clicked && !loading" disabled type="primary">{{reSec}}<span class="label">重新获取</span></van-button>
            <van-button class="codeBtn" loading  v-if="loading" type="primary" loading-text="加载中..." />
        </div>
    </div>
</template>

<script>
import icon from '../assets/img/icon-demo-1126.png'
export default {
    props: {
    },
    data() {
        return {
            // 引入的小图标
            nameIcon: icon,
            // 邮箱
            email: "",
            // 验证码
            code: "",
            // 控制发送验证码次数
            clicked: false,
            // 按钮加载中显示
            loading: false,
            // 剩余再次发送验证码时间
            reSec: 60,
            // 验证码发送定时器
            timer: null
        }
    },
    methods: {
        // 邮箱输入框失去焦点
        emailBlur(e) {
            this.$emit("emailBlur", e.target.value)
            // console.log(e.target.value)
        },
        // 验证码输入框失去焦点
        codeBlur(e) {
            this.$emit("codeBlur", e.target.value)
            // console.log(e.target.value)
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
                        this.$toast.fail(res.error_email)
                        this.clicked = false
                    }
                }).catch(err => {
                    this.clicked = false
                    this.loading = false
                    this.$toast.fail("网络错误，请稍后重试！")
                })
            } else {
                this.$toast.fail('邮箱格式有误！');
                return false
            }
            
        },
    }
}
</script>

<style lang="less" scoped>
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
</style>