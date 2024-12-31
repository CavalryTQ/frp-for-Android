<script setup>
import {ref, watch} from "vue";
import Ripple from "@/components/ripple.vue";
import {rippleEffect} from "@/animations/customAnimation.js";
import {userCache} from "@/data/cache.js";
import {loadIcon} from "@/mixins/mixin.js";

const funcBtn = ref(null);
const isDarkModel = ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
const group = ref([
    {
      text: "日志",
      icon: userCache.isDark.value ? loadIcon("assignment-w") : loadIcon("assignment-b"),
      type: false,
      isActive: false,
    },
    {
      text: "设置",
      icon: userCache.isDark.value ? loadIcon("settings-w") : loadIcon("settings-b"),
      type: false,
      isActive: false,
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
      case "关于":
        item.icon = newValue ? loadIcon("error-w") : loadIcon("error-b");
        break;
    }
  })
})
// console.log(userCache);
// console.log(userCache.get("isDark"));
// console.log(userCache.isDark.value);
function test(){
  isDarkModel.value = !isDarkModel.value;
  userCache.isDark.value = isDarkModel.value;
  console.log("test", userCache);
  console.log(userCache.get("isDark"));
  console.log(userCache.isDark.value);
}
</script>

<template>
     <ripple>
       <div class="func-group">
         <div class="func-button" v-for="(item, index) in group" @pointerdown="rippleEffect($event, funcBtn[index], {isDark: isDarkModel, duration: 1000});test();" :key="index" ref="funcBtn">
           <div class="func-icon"><img style="width: 100%;height: 100%" :src="item.icon" alt="icon"></div>
           <div class="func-text">{{item.text}}</div>
         </div>
       </div>
     </ripple>
</template>

<style scoped>
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