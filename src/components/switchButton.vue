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

 @media (orientation: landscape){
   .switch {
     width: calc(117 * var(--scale-factor-height)) !important;
     height: calc(72 * var(--scale-factor-height)) !important;
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
     .switch-box {
       position: relative;
       width: calc(117 * var(--scale-factor-width)) !important;
       height: calc(50 * var(--scale-factor-height)) !important;
       cursor: pointer;
       background: #ACACAC;
       border-radius: calc(90 * var(--scale-factor-width)) !important;
       display: flex;
       justify-content: left;
       align-items: center;
       &.active {
         background: #8599B4;
       }
       .switch-btn {
         width: calc(71 * var(--scale-factor-width)) !important;
         height: calc(71 * var(--scale-factor-width)) !important;
         position: absolute;
         /*calc(-71 * var(--scale-factor-width) / 2)*/
         left: calc(-71 * var(--scale-factor-width) / 2) !important;
         background: #fff;
         border-radius: 50%;
         transition: all 0.3s;
         display: flex;
         justify-content: center;
         align-items: center;
         /*opacity: 0.5;*/
         .switch-dot {
           display: none;
         }
         &:hover {
           .switch-dot {
             display: flex;
             justify-content: center;
             align-self: center;
             position: absolute;
             width: calc(130 * var(--scale-factor-width)) !important;
             height: calc(130 * var(--scale-factor-width)) !important;
             background: rgb(0, 0, 0, 0.3);
             border-radius: 50%;
             &.active {
               background: rgb(29, 67, 116, 0.3);
             }
           }
         }
         &.active {
           /*right: calc(71 * var(--scale-factor-width) / 2) !important; --transform-X: calc(71 * var(--scale-factor-width) / 2);
           transform: translateX(var(--transform-X));*/
           /*TODO: 横屏专用移动点位置不生效*/
           --transform-X: calc(117 * var(--scale-factor-width) - calc(71 * var(--scale-factor-width) / 4));
           --transform-X-test: calc(71 * var(--scale-factor-width) * 2 - calc(25 * var(--scale-factor-width)));
           transform-origin: center center !important;
           transform: translateX(var(--transform-X-test)) !important;
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
 }

 .switch {
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
       left: -2px;
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
         /*transform: translateX(50px);*/
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