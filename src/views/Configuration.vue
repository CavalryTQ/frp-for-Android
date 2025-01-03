<script setup>
// 配置列表页
import ConfigItem from "@/components/configItem.vue";
import AppHeader from "@/components/appHeader.vue";
</script>

<template>
     <app-header></app-header>
  <form class="config-list">

      <config-item></config-item>
      <config-item></config-item>
      <config-item></config-item>

    <p>test</p>
  </form>
</template>

<style scoped lang="scss">
 .config-list{
   width: 100%;
   height: auto;
   font-size: 16px;
 }
</style>