<script setup>
 // app头部
 import {ref, watch} from "vue";
 import {userCache} from "@/data/cache.js";
 import {goToPage, loadIcon} from "@/mixins/mixin.js";
 import {useRouter} from "vue-router";

 const router = useRouter();
 const isDarkMode = userCache.isDark;
 const backIcon = ref(isDarkMode.value ? loadIcon('back-w') : loadIcon('back-b'));

 watch(isDarkMode, (newValue) => {
   newValue ? backIcon.value = loadIcon('back-w') : backIcon.value = loadIcon('back-b');
 });
</script>

<template>
  <div class="app-header">
    <div class="header-left">
      <div class="back" @pointerup="goToPage(router, -1)"><img style="width: 100%;height: 100%" :src="backIcon" alt="back"></div>
      <span class="header-name page-name">配置</span>
    </div>
    <div class="header-right func-group">
      <slot name="right">
        文字2
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
 .app-header{
   background: var(--app-background);
    height: 336px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
   text-align: center;
   padding: 0 60px 20px 60px;
   .header-left{
     width: auto;
     display: flex;
     align-items: center;
     .back{
       width: 80px;
       height: 80px;
       img{
         width: 100%;
         height: 100%;
       }
     }
     .header-name{
       margin-left: 50px;
       font-size: 68px;
     }
   }
   .header-right{
     width: auto;
     text-align: center;
     display: flex;
     align-items: center;
   }
 }
</style>