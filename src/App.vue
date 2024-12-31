<script setup>

</script>

<template>
  <div class="body">
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/base.css";
.body{
  box-sizing: border-box;
  overflow: scroll;
  /*滑动隐藏滑动条*/
  -ms-overflow-style: none;
  scrollbar-width: none;
  color: var(--app-text-color);
}
</style>