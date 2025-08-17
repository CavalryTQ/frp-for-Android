<script setup>
 // 日志页，需接受插件String流接口
 import { useRouter } from 'vue-router'
 import {goToPage} from "@/mixins/mixin.js";
 import AppHeader from "@/components/appHeader.vue";
 import {nextTick, onMounted} from "vue";


 const router = useRouter();

 const handlePointerUp = () => {
   goToPage(router, -1);
 }
 onMounted(()=>{
   nextTick(()=>{
   });
 });
</script>

<template>
    <div class="log-cat">
       <app-header title="LogCat"></app-header>
    </div>
</template>

<style scoped lang="scss">

</style>