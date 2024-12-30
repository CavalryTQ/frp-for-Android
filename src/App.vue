<script setup>
import {icons, loadIcons} from "@/mixins/mixin.js";

console.log(icons);
console.log(loadIcons('view-list-w'));
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
  overflow: scroll;
  /*滑动隐藏滑动条*/
  -ms-overflow-style: none;
  scrollbar-width: none;
  color: var(--app-text-color);
}
</style>