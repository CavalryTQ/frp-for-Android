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
  height: 100vh;
  overflow: hidden;
  color: var(--app-text-color);
}
</style>