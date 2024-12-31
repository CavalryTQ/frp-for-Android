<script setup>

import IndexHeader from "@/components/indexHeader.vue";
import MainButton from "@/components/mainButton.vue";
import FunctionGroup from "@/components/functionGroup.vue";
import {ref} from "vue";
import {userCache} from "@/data/cache.js";
import {loadIcon, loadIcons} from "@/mixins/mixin.js";

const isDarkModel = ref(userCache.isDark.value) || ref(window.matchMedia("(prefers-color-scheme: dark)").matches);

console.log(loadIcon("666"))
console.log(loadIcons("circle"));
</script>

<template>
  <div class="content">
    <index-header></index-header>
     <div class="body-content">
       <mainButton :type="true"/>
       <mainButton :icon="isDarkModel ? loadIcon('view-w') : loadIcon('view-b')" title="配置" text="点击编辑"/>
       <function-group></function-group>
     </div>
  </div>
</template>

<style scoped lang="scss">
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .body-content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 120px 105px 0 120px;
      :deep(.main-button:first-child){
        margin-bottom: 60px;
      }
      :deep(.func-group:last-child){
        margin-top: 30px;
      }
    }
  }
</style>