<script setup>
// 功能按钮组
import {ref, watch, defineEmits, toRaw} from "vue";
import {rippleEffect} from "@/animations/customAnimation.js";
import {userCache} from "@/data/cache.js";
import {loadIcon} from "@/mixins/mixin.js";

const emits = defineEmits(['log', 'setting' , 'help', 'about']);

const funcBtn = ref(null);
const isDarkModel = ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
const group = ref([
    {
      text: "日志",
      icon: userCache.isDark.value ? loadIcon("assignment-w") : loadIcon("assignment-b"),
      type: false,
      isActive: false,
      path: "/log",
    },
    {
      text: "设置",
      icon: userCache.isDark.value ? loadIcon("settings-w") : loadIcon("settings-b"),
      type: false,
      isActive: false,
      path: "/setting_app",
    },
  {
    text: "帮助",
    icon: userCache.isDark.value ? loadIcon("help-w") : loadIcon("help-b"),
    type: false,
    isActive: false,
    path: "https://gofrp.org/zh-cn/docs/",
  },
  {
    text: "关于",
    icon: userCache.isDark.value ? loadIcon("error-w") : loadIcon("error-b"),
    type: false,
    isActive: false,
  },
]);

watch(userCache.isDark, (newValue) => {
  group.value.forEach((item) => {
    switch (item.text){
      case "日志":
        item.icon = newValue ? loadIcon("assignment-w") : loadIcon("assignment-b");
        break;
      case "设置":
        item.icon = newValue ? loadIcon("settings-w") : loadIcon("settings-b");
        break;
      case "帮助":
        item.icon = newValue ? loadIcon("help-w") : loadIcon("help-b");
        break;
      case "关于":
        item.icon = newValue ? loadIcon("error-w") : loadIcon("error-b");
        break;
    }
  });
});
const handlePointerUp = (item) => {
  switch (item.text){
    case "日志":
       emits('log', toRaw(item));
      break;
    case "设置":
       emits('setting', toRaw(item));
      break;
    case "帮助":
      emits('help', toRaw(item));
      break;
    case "关于":
      emits('about', true);
  }
};
</script>

<template>
       <div class="func-group">
         <div class="func-button" v-for="(item, index) in group" @pointerdown="rippleEffect($event, funcBtn[index], {duration: 500});"
              :key="index" ref="funcBtn"
              @pointerup="handlePointerUp(item)"
         >
           <div class="func-icon"><img style="width: 100%;height: 100%" :src="item.icon" alt="icon"></div>
           <div class="func-text">{{item.text}}</div>
         </div>
       </div>
</template>

<style scoped>
@media (orientation: landscape) {
  .func-group{
    width: 100% !important;
    box-sizing: border-box;
    height: auto;
    display: flex;
    flex-direction: column;
    .func-button{
      width: 100%;
      height: calc(211 * var(--scale-factor-width)) !important;
      display: flex;
      align-items: center;
      .func-icon{
        width: calc(128 * var(--scale-factor-width)) !important;
        height: calc(128 * var(--scale-factor-height)) !important;
        margin-left: calc(70 * var(--scale-factor-width)) !important;
      }
      .func-text{
        margin-left: calc(60 * var(--scale-factor-width)) !important;
        font-size: calc(49 * var(--scale-factor-width)) !important;
      }
    }
  }
}
  .func-group{
    box-sizing: border-box;
    width: 1054px;
    height: auto;
    display: flex;
    flex-direction: column;
    .func-button{
      width: 100%;
      height: 211px;
      display: flex;
      align-items: center;
      .func-icon{
        width: 128px;
        height: 128px;
        margin-left: 70px;
      }
      .func-text{
        margin-left: 60px;
        font-size: 49px;
      }
    }
  }
</style>