<template>
    <div>
        <Header :title="headerTitle"  />
        <div class="contentBox">
            <div v-if="type == 1">
                <CodeBox @emailBlur="emailBlur" @codeBlur="codeBlur" />
                <van-field
                    v-model="newPwd"
                    left-icon="coupon-o"
                    placeholder="请输入您的新密码"
                    @input="pwdCom"
                    required
                />
                <van-field
                    v-model="newPwd1"
                    left-icon="coupon-o"
                    placeholder="请再次输入您的新密码"
                    :error-message="errMsg"
                    @input="pwdCom1"
                    required
                />
                <div class="tips">温馨提示：密码长度至少为6位，必须包含字母和数字</div>
                <van-button class="setBtn" @click="setPwd(1)" type="primary">确认修改</van-button>
            </div>
            <div v-if="type == 2">
                <van-field
                    v-model="newPwd"
                    left-icon="coupon-o"
                    placeholder="请输入您的密码"
                    @input="pwdCom"
                    required
                />
                <van-field
                    v-model="newPwd1"
                    left-icon="coupon-o"
                    placeholder="请再次输入您的密码"
                    :error-message="errMsg"
                    @input="pwdCom1"
                    required
                />
                <van-button class="setBtn" @click="setPwd(2)" type="primary">确认密码</van-button>
            </div>
            <div v-if="type == 3">
                <van-field
                    v-model="oldPwd"
                    left-icon="coupon-o"
                    placeholder="请输入您的原始密码"
                    required
                />
                <van-field
                    v-model="newPwd"
                    left-icon="coupon-o"
                    placeholder="请输入您的新密码"
                    @input="pwdCom"
                    required
                />
                <van-field
                    v-model="newPwd1"
                    left-icon="coupon-o"
                    placeholder="请再次输入您的新密码"
                    :error-message="errMsg"
                    @input="pwdCom1"
                    required
                />
                <van-button class="setBtn" @click="setPwd(3)" type="primary">确认密码</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import icon from '../assets/img/icon-demo-1126.png'
export default {
    data() {
        return {
            // 顶部导航标题
            headerTitle: "设置密码",
            // 导入的小图标
            nameIcon: icon,
            // 忘记密码或者设置密码，1表示忘记，2表示设置
            type: 1,
            // 旧密码
            oldPwd: "",
            // 新密码
            newPwd: "",
            // 再次输入的新密码
            newPwd1: "",
            // 提示的错误信息
            errMsg: "",
            // 填写的邮箱
            email: "",
            // 填写的验证码
            code: "",
            // 是否已点击发送验证码
            clicked: false,
            // 是否正在发送请求验证码
            loading: false
        }
    },
    created() {
        if (this.$route.params.type){
            this.type = this.$route.params.type
        }
        if (this.$route.params.code) {
            this.email = this.$route.params.email
            this.code = this.$route.params.code
        }
        if (this.type == 1) {
            this.headerTitle = "忘记密码"
        }
        if (this.type == 2) {
            this.headerTitle = "设置密码"
        }
        if (this.type == 3) {
            this.headerTitle = "更改密码"
        }
    },
    methods: {
        emailBlur(val) {
            this.email = val
            // console.log(val)
        },
        codeBlur(val) {
            this.code = val
            // console.log(val)
        },
        // 设置密码， 1代表忘记密码，2代表新设置密码, 3代表更改密码
        setPwd(type) {
            if (type == 1 && !this.oldPwd) {
                this.$toast.fail("请填写完整！")
                return false
            }
            if (!this.newPwd || !this.newPwd1) {
                this.$toast.fail("请填写完整！")
                return false
            }
            if (this.newPwd !== this.newPwd1) {
                this.$toast.fail("新密码两次不一致！")
                return false
            }
            if (this.newPwd.length < 6) {
                this.$toast.fail("密码长度最少为6位！")
                return false
            }
            let reg = /[0-9]/
            let reg1 = /[a-z]/i
            if (!reg.test(this.newPwd) || !reg1.test(this.newPwd)) {
                this.$toast.fail("密码必须包含字母和数字！")
                return false
            }
            let params = {
                email: this.email,
                code: this.code,
                newPassword: this.newPwd
            }
            if (type == 3) {
                params.password = this.oldPwd
                params.type = "2"
            }
            if (type == 2) {
                params.type = "1"
            }
            if (type == 1) {
                params.type = "3"
            }
            console.log(params)
            this.$post("/setPwd", params).then(res => {
                if (res.success) {
                    this.$toast.success("注册成功！")
                    let result = JSON.parse(res.studentInfo)[0].fields
                    console.log(result)
                    this.$store.commit('setCurrentSite', result.defaultSite)
                    this.$store.commit('setSiteList', result.siteList)
                    localStorage.setItem('status', result.status)
                    localStorage.setItem('userinfo', result)
                    localStorage.setItem('avatar', result.avatar)
                    localStorage.setItem('id', result.id)
                    localStorage.setItem('name', result.nickname)
                    localStorage.setItem('email', result.email)
                    // 进入主页
                    this.$router.replace("/main")
                } else{
                    this.$toast.fail("注册失败，请重试！")
                }
            }).catch(err => {
                this.$toast.fail("网络开小差了，请稍候重试！")
            })
        },
        pwdCom(val) {
            if (this.newPwd1) {
                if (val !== this.newPwd1) {
                    this.errMsg = "两次密码不一致"
                } else {
                    this.errMsg = ""
                }
            }
        },
        pwdCom1(val) {
            if (val !== this.newPwd) {
                this.errMsg = "两次密码不一致"
            } else {
                this.errMsg = ""
            }
        },
        getCode() {

        }
    }
}
</script>

<style lang="less" scoped>
.contentBox {
    width: 90%;
    margin-left: 5%;
    .setBtn {
        margin-top: 20px;
        font-size: 18px;
        width: 100%;
        height: 40px;
        border-radius: 20px;
    }
    .tips {
        width: 100%;
        font-size: 12px;
        color: #ccc;
        text-align: left;
        margin-top: 10px;
    }
}

/deep/ .van-cell {
    border-bottom: 1px solid #20242b;
    margin-top: 5px;
}
/deep/ .van-cell:not(:last-child)::after {
    border-bottom: 0;
}
</style>