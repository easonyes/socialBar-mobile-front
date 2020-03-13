<template>
    <div>
        <Header :title="headerTitle" rText="验证码登录" />
        <div class="contentBox">
            <div v-if="type == 1">
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
                    required
                />
                <van-field
                    v-model="newPwd1"
                    left-icon="coupon-o"
                    placeholder="请再次输入您的新密码"
                    :error-message="errMsg"
                    @input="pwdCom"
                    required
                />
                <div class="tips">温馨提示：密码长度至少为6位，必须包含字母和数字</div>
                <van-button class="setBtn" @click="setPwd" type="primary">确认修改</van-button>
            </div>
            <div v-if="type == 2"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headerTitle: "设置密码",
            type: 1,
            oldPwd: "",
            newPwd: "",
            newPwd1: "",
            errMsg: "",
            email: "",
            code: ""
        }
    },
    created() {
        if (this.$route.params.type){
            this.type = this.$route.params.type
        }
        if (this.type == 1) {
            this.headerTitle = "忘记密码"
        }
    },
    methods: {
        setPwd() {
            if (!this.oldPwd || !this.newPwd || !this.newPwd1) {
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
            this.$post()
        },
        pwdCom(val) {
            if (val !== this.newPwd) {
                this.errMsg = "两次密码不一致"
            } else {
                this.errMsg = ""
            }
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