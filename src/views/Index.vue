<script setup>
// app首页
import IndexHeader from "@/components/indexHeader.vue";
import MainButton from "@/components/mainButton.vue";
import FunctionGroup from "@/components/functionGroup.vue";
import {ref, watch} from "vue";
import {userCache} from "@/data/cache.js";
import {goToPage, loadIcon} from "@/mixins/mixin.js";
import {useRouter} from "vue-router";
import About from "@/components/about.vue";

// const isDarkModel = ref(userCache.isDark.value);
const router = useRouter();
const popupAbout = ref(false);
const configIcon = userCache.isDark.value ? ref(loadIcon('view-w')) : ref(loadIcon('view-b'));

const handlePointerDown = () => {
  // console.log(router)
  // systemModel.value = !systemModel.value;
  goToPage(router, "/config");
}
console.log(configIcon)
watch(userCache.isDark, (newValue) => {
  configIcon.value = newValue ? loadIcon('view-w') : loadIcon('view-b');
})
</script>

<template>
  <div class="content">
    <index-header></index-header>
     <div class="body-content">
       <mainButton :type="true"/>
       <mainButton v-model:icon="configIcon" title="配置" text="点击编辑" @pointerdown="handlePointerDown"/>
       <function-group @about="args => {popupAbout = args}"></function-group>
     </div>
  </div>

  <about :show="popupAbout" @close="args => {popupAbout = args}"></about>
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