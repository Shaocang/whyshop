<template>
  <div class="swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem'
}
</script>

<style scoped>
  .swiper-item,
  .swiper-item img {
    width: 100vw;
    height: 100%;
  }
</style>
