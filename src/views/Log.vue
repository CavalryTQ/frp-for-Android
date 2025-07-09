<script setup>
 // 历史日志查看与启动页
 import AppHeader from "@/components/appHeader.vue";
 import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
 import LogViewer from "@/components/logViewer.vue";
 import {userCache} from "@/data/cache.js";

 const syncLogs  = userCache.syncLogs;

 // watch(userCache.syncLogs,  (val) => {
 //   console.log('userCache.syncLogs:', val);
 // });
 onMounted(()=>{
   // frpLine.value = routeQuery;
   nextTick(()=>{
     // frp.addListener('frpOutput',  (data) => {
     //   console.log('frp输出111：', data);
     //   frpLine.value = data.FrpLine;
     //   console.log(frpLine.value);
     // });
   })
 });
 onUnmounted(()=>{
 })
</script>

<template>
   <div class="log">
     <app-header title="日志"></app-header>
     <log-viewer :model-value="syncLogs"></log-viewer>
   </div>
</template>

<style scoped lang="scss">

</style>