<template>
  <div>
    <h1>組件測試!</h1>
    <button id="b1" @click="add">{{ count }}</button>
  </div>
</template>

<script>
import alanBtn from '@alan-ai/alan-sdk-web';

export default {
  data(){
    return {
      count: 0,
    }
  },
  methods: {
    add() {
      this.count += 1
    },
  }
}

</script>

<style>
</style>