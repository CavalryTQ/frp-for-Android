<script setup>
// 开关组件
import {defineEmits, defineProps, ref, watch} from "vue"
import {userCache} from "@/data/cache.js";

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['change']);

const switchBox = ref(null);
const switchBtn = ref(null);
const switchDot = ref(null);

const handleSwitch = () => {
  if (props.disabled) {
    return;
  }
  // 切换开关状态动画
  switchBox.value.classList.toggle('active');
  switchBtn.value.classList.toggle('active');
  switchDot.value.classList.toggle('active');
  console.log(switchBtn.value);
  emit('change', !props.isActive);
}

watch(userCache.isDark, (newValue) => {

});
</script>

<template>
<div class="switch">
  <div class="switch-box" ref="switchBox">
      <div class="switch-btn" ref="switchBtn" @pointerup="handleSwitch">
        <div class="switch-dot" ref="switchDot"></div>
      </div>
  </div>
</div>
</template>

<style scoped lang="scss">
 .switch {
  /* --switch-box-bg:#ACACAC;
   --switch-box-active-bg: #8599B4;
   --switch-btn-bg:#fff;
   --switch-btn-active-bg: rgb(0, 0, 0, 0.3);*/
   width: 117px;
   height: 72px;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   .switch-box {
     position: relative;
     width: 117px;
     height: 50px;
     cursor: pointer;
     background: #ACACAC;
     border-radius: 90px;
     display: flex;
     justify-content: left;
     align-items: center;
     &.active {
       background: #8599B4;
     }
     .switch-btn {
       width: 71px;
       height: 71px;
       position: absolute;
       left: 0;
       background: #fff;
       border-radius: 50%;
       transition: all 0.3s;
       display: flex;
       justify-content: center;
       align-items: center;
       .switch-dot {
         display: none;
       }
       &:hover {
         .switch-dot {
           display: flex;
           justify-content: center;
           align-self: center;
           position: absolute;
           width: 130px;
           height: 130px;
           background: rgb(0, 0, 0, 0.3);
           border-radius: 50%;
           &.active {
             background: rgb(29, 67, 116, 0.3);
           }
         }
       }
       &.active {
         transform: translateX(50px);
         background: #1d4374;
       }
       &.disabled {

       }
     }
   }

   /*系统黑夜模式*/
   @media (prefers-color-scheme: dark) {
     .switch-box {
       background: #ACACAC;
       &.active {
         background: #1c4e7f;
       }
       .switch-btn {
         background: #333333;
         .switch-dot {
           display: none;
         }
         &:hover {
           .switch-dot {
             display: block;
             background: rgb(255, 255, 255, 0.3);
             border-radius: 50%;
             &.active {
               background: rgb(25, 116, 205, 0.3);
             }
           }
         }
         &.active {
           background: #1974cd;
         }
         &.disabled {

         }
       }
     }
   }
 }
</style>