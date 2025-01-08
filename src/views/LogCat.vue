<script setup>
 // 日志页
 import { useRouter } from 'vue-router'
 import {goToPage} from "@/mixins/mixin.js";

 const router = useRouter()

 const handlePointerUp = () => {
   goToPage(router, -1);
 }
</script>

<template>
  <div style="height: 50vh;background: #1976D3;"><button @pointerup="handlePointerUp">back</button></div>
</template>

<style scoped lang="scss">

</style>