<script setup>
 // 日志页，需接受插件String流接口
 import { useRouter } from 'vue-router'
 import {goToPage} from "@/mixins/mixin.js";
 import AppHeader from "@/components/appHeader.vue";

 const router = useRouter()

 const handlePointerUp = () => {
   goToPage(router, -1);
 }
</script>

<template>
    <div class="log-cat">
       <app-header></app-header>
    </div>
</template>

<style scoped lang="scss">

</style>