<template>
  <div>
      <div>这里是注册</div>
      <div>
          用户名：<input type="text" v-model="name">
      </div>
      <div>
          密码：<input type="text" v-model="password">
      </div>
      <div>
          地址：<input type="text" v-model="address">
      </div>
      <div>
          生日：<input type="text" v-model="birthday">
      </div>
      <div>
          姓名：<input type="text" v-model="nickname">
      </div>
      <div>
          性别：<input type="text" v-model="gender">
      </div>
      <div>
          手机号：<input type="text" v-model="phone">
      </div>
      <button @click="test">点我发送注册请求</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'pk002',
            password: '000000',
            address: 'address',
            birthday: '2020-3-8',
            nickname: 'pk',
            gender: 1,
            phone: '133'
        }
    },
    mounted() {},
    methods: {
        test() {
            this.$post('/register', {
                name: this.name,
                password: this.password,
            }).then(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>