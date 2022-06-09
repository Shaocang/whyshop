<template>
  <div id="home">
    <home-swiper :banner="banner"/>
  </div>
</template>

<script>
import HomeSwiper from './homeComps/HomeSwiper.vue'
import { getMultidata } from 'network/home'

export default {
  components: { HomeSwiper },
  name: 'Home',
  data() {
    return {
      banner: []
    }
  },
  created() {
    // 网络请求得到multidata
    getMultidata()
      .then((res) => {
        this.banner = res.data.banner.list
      })
  }
}
</script>

<style scoped>

</style>
