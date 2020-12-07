<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <Hello/>
    <ChalkColor/>
  </div>
</template>

<script>
import Hello from './views/Hello.vue'
import ChalkColor from './views/OpenData.vue'

export default {
  components: { Hello, ChalkColor },
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
