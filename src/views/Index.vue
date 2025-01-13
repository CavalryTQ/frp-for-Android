<script setup>
// app首页
import IndexHeader from "@/components/indexHeader.vue";
import MainButton from "@/components/mainButton.vue";
import FunctionGroup from "@/components/functionGroup.vue";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {userCache} from "@/data/cache.js";
import {goToPage, loadIcon} from "@/mixins/mixin.js";
import {useRouter} from "vue-router";
import About from "@/components/about.vue";

// const isDarkModel = ref(userCache.isDark.value);
const router = useRouter();
const popupAbout = ref(false);
const content = ref(null);
const configIcon = userCache.isDark.value ? ref(loadIcon('view-w')) : ref(loadIcon('view-b'));

const handlePointerUp = () => {
  // console.log(router)
  // systemModel.value = !systemModel.value;
  goToPage(router, "/config");
}
const handleGoToLog = (info) => {
  goToPage(router, info.path)
}
watch(userCache.isDark, (newValue) => {
  configIcon.value = newValue ? loadIcon('view-w') : loadIcon('view-b');
});

</script>

<template>
  <div class="content">
    <index-header></index-header>
     <div class="body-content" ref="content">
       <mainButton :type="true"/>
       <mainButton v-model:icon="configIcon" title="配置" text="点击编辑" @pointerup="handlePointerUp"/>
       <function-group @about="args => {popupAbout = args}"
                       @log="args => {handleGoToLog(args)}"
       ></function-group>
     </div>
    <about :show="popupAbout" @close="args => {popupAbout = args}"></about>
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

  @media (orientation: landscape) {
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
        //padding: calc(120 * var(--scale-factor-width)) calc(105 * var(--scale-factor-width)) 0 calc(120 * var(--scale-factor-width)) !important;
        padding: 0 calc(550 * var(--scale-factor-width));
        padding-top: calc(105 * var(--scale-factor-width));
        :deep(.main-button:first-child){
          margin-bottom: calc(60 * var(--scale-factor-width)) !important;
        }
        :deep(.func-group:last-child){
          margin-top: calc(30 * var(--scale-factor-width)) !important;
        }
      }
    }
  }

/*小于2040width 大于1480width*/
  @media ( min-width: 2040px) and (max-width: 1480px) {
    .content{
      .body-content{
        //padding: calc(120 * var(--scale-factor-width)) calc(105 * var(--scale-factor-width)) 0 calc(120 * var(--scale-factor-width)) !important;
        padding: 0 calc(350 * var(--scale-factor-width));
        padding-top: calc(105 * var(--scale-factor-width));
        :deep(.main-button:first-child){
          margin-bottom: calc(60 * var(--scale-factor-width)) !important;
        }
        :deep(.func-group:last-child){
          margin-top: calc(30 * var(--scale-factor-width)) !important;
        }
      }
    }
  }

  /*小于1480 大于764*/
  @media (min-width: 1480px) and (max-width: 764px) {
    .content{
      .body-content{
        padding: 0 calc(150 * var(--scale-factor-width));
        padding-top: calc(105 * var(--scale-factor-width));
      }
    }
  }

</style>