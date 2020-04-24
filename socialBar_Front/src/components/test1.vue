<template>
  <div>
    <h1>count:{{ count }}</h1>
    <button @click="$store.commit('dec')">--</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'count'
    ])
  }
}
</script>

<style>

</style>