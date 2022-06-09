<template>
  <div id="home-swiper">
    <swiper :imgsNum="banner.length" :isMounted="isMounted">
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    // 接收到轮播图的链接图片数据
    banner: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isMounted: false
    }
  },
  mounted() {
    // 控制Swiper显示
    this.isMounted = true
  }
}
</script>

<style scoped>
</style>
