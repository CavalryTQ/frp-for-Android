<script setup>
 // 历史日志查看与启动页
 import { useRouter } from 'vue-router'
 import {goToPage} from "@/mixins/mixin.js";
 const router = useRouter()

</script>

<template>
   <div style="height: 50vh;background: #2c3e50" @pointerup.self="console.log('go')">
     <button @pointerup="goToPage(router, -1);">back</button>
     <button @pointerup="goToPage(router, '/logcat');">go</button>
   </div>
</template>

<style scoped lang="scss">

</style>