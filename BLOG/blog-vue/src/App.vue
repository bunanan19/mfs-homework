<template>
  <div id="app">
    <main-nav></main-nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainNav from './components/MainNav.vue'
export default {
  name: 'App',
  components: {MainNav}
}
</script>

<style>
/* @import './assets/css/base.css'; */

ol,ul,body {
  margin: 0;
  padding: 0;
}
ol,ul {
  list-style: none;
}
.container {
    width: 80%;
    margin: 0 auto;
}
</style>
