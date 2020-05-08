<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <div>xxx</div>
    <my-add></my-add>
    <p>***************</p>
    <my-dec></my-dec> -->
  </div>
</template>

<script>
// import add from './components/test'
// import dec from './components/test1'
export default {
  name: 'App',
  // data() {
  //   return {

  //   }
  // },
  // components: {
  //   'my-add': add,
  //   'my-dec': dec
  // }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
