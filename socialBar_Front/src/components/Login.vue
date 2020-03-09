<template>
  <div>
      <div>
          用户名：<input type="text" v-model="name">
      </div>
      <div>
          密码：<input type="text" v-model="password">
      </div>
      <button @click="login">点我发送登录请求</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            password: '',
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
        }
    }
}
</script>

<style>

</style>