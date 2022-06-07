<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100vw;
    display: flex;
    flex-flow: row nowrap;
    background-color: #fff;
    box-shadow: 0 0 1px rgba(0, 0, 0, .3);
  }
</style>
