<script setup>
 // app头部
 import {ref, watch, defineProps, defineEmits} from "vue";
 import {userCache} from "@/data/cache.js";
 import {goToPage, loadIcon} from "@/mixins/mixin.js";
 import {useRouter} from "vue-router";
 import {rippleEffect} from "@/animations/customAnimation.js";
 import  "@assets/components/appHeaderRightScope.css";

 const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
 });
 const emit = defineEmits(['back', 'right']);

 const router = useRouter();
 const back = ref(null);
 const isDarkMode = userCache.isDark;
 const backIcon = ref(isDarkMode.value ? loadIcon('back-w') : loadIcon('back-b'));

 const handlePointerDown = (event) => {
   // 判断 event.target是否为 img
   if (event.target.tagName === 'IMG') {
     rippleEffect(event, event.target.offsetParent);
     emit('right', {event: event, eventHTML: event.target.offsetParent, data: {}});
   }else {
     // 判断 event.target是否为 class === func-group-right
     if (!event.target.classList.contains('func-group-right')) {
       rippleEffect(event, event.target);
       emit('right', {event: event, eventHTML: event.target, data: {}});
     }
   }
 };

 watch(isDarkMode, (newValue) => {
   newValue ? backIcon.value = loadIcon('back-w') : backIcon.value = loadIcon('back-b');
 });

</script>

<template>
  <div class="app-header">
    <div class="header-left">
      <div class="back" ref="back" @pointerdown="rippleEffect($event, back);"
           @pointerup="goToPage(router, -1);emit('back', {event: $event, router: router});">
        <img :src="backIcon" alt="back"></div>
      <span class="header-name page-name">{{ props.title }}</span>
    </div>
    <div  class="header-right func-group-right" @pointerdown="handlePointerDown($event)">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (orientation: landscape) {
  .app-header{
    height: calc(280 * var(--scale-factor-width)) !important;
    margin: 0 calc(60 * var(--scale-factor-width)) calc(20 * var(--scale-factor-width)) calc(60 * var(--scale-factor-width)) !important;
    .header-left{
      .back{
        width: calc(96 * var(--scale-factor-width)) !important;
        height: calc(96 * var(--scale-factor-width)) !important;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 60%;
          height: 60%;
        }
      }
      .header-name{
        margin-left: calc(50 * var(--scale-factor-width)) !important;
        font-size: calc(68 * var(--scale-factor-width)) !important;
      }
    }
    .header-right{
      width: auto;
      text-align: center;
      display: flex;
      align-items: center;
      & > *{
        border-radius: 50%;
      }
    }
  }
}

 .app-header{
   background: var(--app-background);
    height: 280px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
   text-align: center;
   //padding: 0 60px 20px 60px;
   margin: 0 60px 20px 60px;
   .header-left{
     width: auto;
     display: flex;
     align-items: center;
     .back{
       width: 96px;
       height: 96px;
       display: flex;
       align-items: center;
       justify-content: center;
       border-radius: 50%;
       img{
         width: 60%;
         height: 60%;
       }
     }
     .header-name{
       margin-left: 50px;
       font-size: 68px;
     }
   }
   .header-right{
     width: auto;
     text-align: center;
     display: flex;
     align-items: center;
     justify-content: space-between;
      &  *{
        border-radius: 50%;
     }
   }
 }
</style>