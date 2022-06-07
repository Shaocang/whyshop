<template>
  <div id="app">
    <router-view/>
    <main-tabbar/>
  </div>
</template>

<script>
import MainTabbar from 'components/content/mainTabbar/MainTabbar.vue'

export default {
  name: 'App',
  components: {
    MainTabbar
  }
}
</script>

<style>
  @import 'assets/css/base.css';

  .tabbar-item img {
    width: 32px;
    height: 32px;
  }
</style>
