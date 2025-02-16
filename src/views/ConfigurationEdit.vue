<script setup>
// 配置编辑页面，使用codemirror编辑器
import AppHeader from "@/components/appHeader.vue";
import CodeEdit from "@/components/tomlCodeEdit.vue";
import {onMounted, onUnmounted, ref} from "vue";

// TODO：用户退出当前路由未编辑完成的内容会清空，编辑器需要缓存未编辑完的内容，需要保存到本地 2025-2-14
let code;
onMounted(()=>{
  console.log(code);
});

onUnmounted(()=>{
  code = null;
});
</script>

<template>
  <div class="config-edit">
    <app-header title="配置编辑"></app-header>
    <div class="config-edit-content">
       <code-edit v-model="code" ></code-edit>
    </div>
  </div>
</template>

<style scoped lang="scss">


.config-edit{
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  .config-edit-content{
    display: flex;
    flex: 1;
    overflow: hidden;
  }
}

</style>