<script setup>
// 开关组件
import {defineEmits, defineProps, ref} from "vue"

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

const handleSwitch = (el) => {
  if (props.disabled) {
    return;
  }
  // 切换开关状态动画
  switchBox.value.classList.toggle('active');
  switchBtn.value.classList.toggle('active');
  switchBtn.value.classList.toggle('disabled');
  switchDot.value.classList.toggle('active');
  console.log(switchBtn.value);
  emit('change', !props.isActive);
}
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
   width: auto;
   height: auto;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   background-size: cover;
   .switch-box {
     position: relative;
     width: 200px;
     height: 90px;
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
       width: 120px;
       height: 120px;
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
           display: block;
           position: absolute;
           width: 230px;
           height: 230px;
           background: rgb(0, 0, 0, 0.3);
           border-radius: 50%;
           &.active {
             background: rgb(29, 67, 116, 0.3);
           }
         }
       }
       &.active {
         transform: translateX(90px);
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