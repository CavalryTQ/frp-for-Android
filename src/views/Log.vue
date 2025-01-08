<script setup>
 // 历史日志查看与启动页
 import { useRouter } from 'vue-router'
 import {goToPage} from "@/mixins/mixin.js";
 const router = useRouter()

 const handleGoBack = () => {
   goToPage(router, -1);
 }
</script>

<template>
   <div style="height: 50vh;background: #2c3e50" @pointerup.self="console.log('go')">
     <button @pointerup="handleGoBack">back</button>
     <button @pointerup="console.log('go')">go</button>
   </div>
</template>

<style scoped lang="scss">

</style>