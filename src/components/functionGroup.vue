<script setup>
import {ref} from "vue";
import Ripple from "@/components/ripple.vue";
import {rippleEffect} from "@/animations/customAnimation.js";

const funcBtn = ref(null);
const isDarkModel = ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
const group = ref([
    {
      text: "日志",
      icon: "",
      type: false,
      isActive: false,
    },
    {
      text: "设置",
      icon: "",
      type: false,
      isActive: false,
    },
  {
    text: "关于",
    icon: "",
    type: false,
    isActive: false,
  },
])
const test = ()=>{
  console.log(funcBtn);
}
</script>

<template>
     <ripple>
       <div class="func-group">
         <div class="func-button" v-for="(item, index) in group" @pointerdown="rippleEffect($event, funcBtn[index], {isDark: isDarkModel})" :key="index" ref="funcBtn">
           <div class="func-icon"></div>
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
        background-color: #30638E;
        margin-left: 70px;
      }
      .func-text{
        margin-left: 60px;
        font-size: 49px;
      }
    }
  }
</style>