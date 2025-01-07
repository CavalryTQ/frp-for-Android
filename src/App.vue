<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import Configuration from "@/views/Configuration.vue";

const pageFade = ref('');

const router = useRouter();

router.beforeEach((to, from) => {
  // 根据路由标记判断触发哪个动画
  if (to.meta.index > from.meta.index) {
    // 从右往左动画
    pageFade.value = 'slide-right';
  } else if (to.meta.index < from.meta.index) {
    // 从左往右动画
    pageFade.value = 'slide-left';
  } else {
    pageFade.value = '';
  }
});
</script>

<template>
  <div class="body">
<!--    翻页动画-->
   <div class="animation">
    <router-view v-slot="{ Component }">
      <transition :name="pageFade">
           <component :is="Component" />
      </transition>
    </router-view>
<!--     <component :is="Configuration"/>-->
   </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/base.css";
.body{
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: scroll;
  /*滑动隐藏滑动条*/
  -ms-overflow-style: none;
  scrollbar-width: none;
  color: var(--app-text-color);
  &::-webkit-scrollbar {
    display: none;
  }
 .animation{
   display: flex;
   flex-direction: row;
   width: 200%;
   height: auto;
   & > div {
     width: 50%;
   }
 }
}

/* 翻页动画 */
.fade-enter-active, .fade-leave-active {
  transition: transform 1s ease, opacity 1s ease;
}
.fade-enter, .fade-leave-to {
  transform: translateX(100%); opacity: 0;
}
.fade-leave, .fade-enter-to {
  transform: translateX(0); opacity: 1;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s;
}

//.slide-right-enter-from {
//  transform: translateX(0);
//}
.slide-right-enter-to {
  transform: translateX(0);
}
//.slide-right-leave-from {
//  transform: translateX(0);
//}
.slide-right-leave-to {
  transform: translateX(-100%);
}

//.slide-left-enter-from {
//  transform: translateX(-200%);
//}
.slide-left-enter-to {
  transform: translateX(0);
}
//.slide-left-leave-from {
//  transform: translateX(0);
//}
.slide-left-leave-to {
  transform: translateX(100%);
}

</style>