<script setup>
// 开关组件
import {defineEmits, defineProps, nextTick, ref, watch} from "vue"
import {userCache} from "@/data/cache.js";
import Model from "@/data/model.js";

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

const switchBox_bg_dark = '#676767';
const switchBox_bg_active_dark = '#1c4e7f';
const switchBtn_bg_dark = '#333333';
const switchBtn_bg_active_dark = '#1974cd';
const switchDot_bg_hover_dark = 'rgb(255, 255, 255, 0.3)';
const switchDot_bg_hover_active_dark = 'rgb(25, 116, 205, 0.3)';

const switchBox_bg_light = '#ADADAD';
const switchBox_bg_active_light = '#8599B4';
const switchBtn_bg_light = '#fff';
const switchBtn_bg_active_light = '#1d4374';
const switchDot_bg_hover_light = 'rgb(0, 0, 0, 0.3)';
const switchDot_bg_hover_active_light = 'rgb(29, 67, 116, 0.3)';


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
// watch(userCache.isDark, (newValue, oldValue) => {
//    console.log('isDark', newValue, oldValue)
//     Model.changeTheme({isDark: newValue, css: `
//     .switch-box {
//       background: red !important;
//     }
//     `});
// });
nextTick(() => {
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

 @media (orientation: landscape){
   .switch {
     width: calc(117 * var(--scale-factor-height)) !important;
     height: calc(117 * var(--scale-factor-height)) !important;
     position: relative;
     display: flex;
     justify-content: center;
     align-items: center;
     .switch-box {
       position: relative;
       width: calc(117 * var(--scale-factor-width)) !important;
       height: calc(50 * var(--scale-factor-height)) !important;
       cursor: pointer;
       background: #ADADAD;
       border-radius: calc(90 * var(--scale-factor-width)) !important;
       display: flex;
       justify-content: left;
       align-items: center;
       &.active {
         background: #8599B4;
       }
       .switch-btn {
         width: calc(71 * var(--scale-factor-height)) !important;
         height: calc(71 * var(--scale-factor-height)) !important;
         position: absolute;
         /*calc(-71 * var(--scale-factor-width) / 2)*/
         left: 0 !important;
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
             width: calc(130 * var(--scale-factor-height)) !important;
             height: calc(130 * var(--scale-factor-height)) !important;
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
           --transform-X-test2: calc(50 * var(--scale-factor-height));
           transform-origin: center center !important;
           transform: translateX(var(--transform-X-test2)) !important;
         }
       }
     }


     /*系统黑夜模式*/
     @media (prefers-color-scheme: dark) {
       .switch-box {
         background: #676767;
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
   --switch-box-bg-dark: #676767;
   --switch-box-bg-active-dark: #1c4e7f;
   --switch-btn-bg-dark: #333333;
   --switch-btn-bg-active-dark: #1974cd;
   --switch-dot-bg-hover-dark: rgb(255, 255, 255, 0.3);
   --switch-dot-bg-hover-active-dark: rgb(25, 116, 205, 0.3);

   --switch-box-bg-light: #ADADAD;
   --switch-box-bg-active-light: #8599B4;
   --switch-btn-bg-light: #fff;
   --switch-btn-bg-active-light: #1d4374;
   --switch-dot-bg-hover-light: rgb(0, 0, 0, 0.3);
   --switch-dot-bg-hover-active-light: rgb(29, 67, 116, 0.3);

   width: 100%;
   height: 100%;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   .switch-box {
     --switch-box-bg: var(--switch-box-bg-light);
     --switch-box-bg-active: var(--switch-box-bg-active-light);
     --switch-btn-bg: var(--switch-btn-bg-light);
     --switch-btn-bg-active: var(--switch-btn-bg-active-light);
     --switch-dot-bg-hover: var(--switch-dot-bg-hover-light);
     --switch-dot-bg-hover-active: var(--switch-dot-bg-hover-active-light);

     position: relative;
     width: 117px;
     height: 50px;
     cursor: pointer;
     background: var(--switch-box-bg);
     border-radius: 90px;
     display: flex;
     justify-content: left;
     align-items: center;
     &.active {
       background: var(--switch-box-bg-active);
     }
     .switch-btn {
       width: 71px;
       height: 71px;
       position: absolute;
       left: -2px;
       background: var(--switch-btn-bg);
       border-radius: 50%;
       transition: all 0.3s;
       display: flex;
       justify-content: center;
       align-items: center;
       border: 1px solid rgba(0, 0, 0, 0.1);
       /*阴影*/
       box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3) !important;
       z-index: 9999;
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
           background: var(--switch-dot-bg-hover);
           border-radius: 50%;
           &.active {
             background: var(--switch-dot-bg-hover-active);
           }
         }
       }
       &.active {
         /*transform: translateX(50px);*/
         transform: translateX(50px);
         background: var(--switch-btn-bg-active);
       }
     }
   }

   /*系统黑夜模式*/
   @media (prefers-color-scheme: dark) {
     .switch-box {
       --switch-box-bg: var(--switch-box-bg-dark);
       --switch-box-bg-active: var(--switch-box-bg-active-dark);
       --switch-btn-bg: var(--switch-btn-bg-dark);
       --switch-btn-bg-active: var(--switch-btn-bg-active-dark);
       --switch-dot-bg-hover: var(--switch-dot-bg-hover-dark);
       --switch-dot-bg-hover-active: var(--switch-dot-bg-hover-active-dark);

       background: var(--switch-box-bg);
       &.active {
         background: var(--switch-box-bg-active);
       }
       .switch-btn {
         background: var(--switch-btn-bg);
         .switch-dot {
           display: none;
         }
         &:hover {
           .switch-dot {
             display: block;
             background: var(--switch-dot-bg-hover);
             border-radius: 50%;
             &.active {
               background: var(--switch-dot-bg-hover-active);
             }
           }
         }
         &.active {
           background: var(--switch-btn-bg-active);
         }
       }
     }
   }
 }

</style>