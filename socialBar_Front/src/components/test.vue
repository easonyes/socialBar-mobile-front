<template>
  <div>
    <h1>count: {{$store.state.count}}</h1>
    <button @click="$store.commit('add')">++</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>

</style>