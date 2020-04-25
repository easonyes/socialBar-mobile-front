<template>
  <div>
    <h1>count:{{ count }}</h1>
    <button @click="dec">--</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'count'
    ])
  },
  methods: {
    ...mapMutations(['dec'])
  }
}
</script>

<style>

</style>