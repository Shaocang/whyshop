<template>
  <div class="tabbar-item" @click="toLink">
    <div class="icon" v-show="!isActive">
      <slot name="icon"></slot>
    </div>
    <div class="icon_active" v-show="isActive">
      <slot name="icon_active"></slot>
    </div>
    <div class="title" :class="{active: isActive}">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.link
    }
  },
  methods: {
    toLink() {
      this.$router.push(this.link)
    }
  }
}
</script>

<style scoped>
  .tabbar-item {
    flex: 1;
    text-align: center;
    height: 59px;
    margin-top: 5px;
  }

  .active {
    color: var(--color-high-text)
  }
</style>
