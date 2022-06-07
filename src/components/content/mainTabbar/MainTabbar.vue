<template>
  <tabbar>
    <tabbar-item link="/home">
      <img slot="icon" src="~assets/img/tabbar/home.svg" alt="home">
      <img slot="icon_active" src="~assets/img/tabbar/home_active.svg" alt="home">
      <span slot="title">首页</span>
    </tabbar-item>
    <tabbar-item link="/category">
      <img slot="icon" src="~assets/img/tabbar/category.svg" alt="category">
      <img slot="icon_active" src="~assets/img/tabbar/category_active.svg" alt="category">
      <span slot="title">分类</span>
    </tabbar-item>
    <tabbar-item link="/cart">
      <img slot="icon" src="~assets/img/tabbar/cart.svg" alt="cart">
      <img slot="icon_active" src="~assets/img/tabbar/cart_active.svg" alt="cart">
      <span slot="title">购物车</span>
    </tabbar-item>
    <tabbar-item link="/user">
      <img slot="icon" src="~assets/img/tabbar/profile.svg" alt="profile">
      <img slot="icon_active" src="~assets/img/tabbar/profile_active.svg" alt="profile">
      <span slot="title">用户</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from 'components/common/tabbar/Tabbar.vue'
import TabbarItem from 'components/common/tabbar/TabbarItem.vue'

export default {
  name: 'MainTabbar',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>
</style>
