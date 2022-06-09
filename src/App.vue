<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">-->
  <TicTacToe />
  <TicTacToe />
  <!--<router-view />-->
</template>

<script>
import TicTacToe from './components/TicTacToe.vue'

export default {
  name: 'App',
  components: {
    TicTacToe
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
