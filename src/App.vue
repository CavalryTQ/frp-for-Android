<script setup>

import { ref} from "vue";
import {useRouter} from "vue-router";
import {isBack} from "@/mixins/mixin.js";

const pageScale = ref('');
const router = useRouter();

router.beforeEach(() => {
  isBack.value ? pageScale.value = 'scale-slide-back': pageScale.value = 'scale-slide-go';
  return true;
});
</script>

<template>
  <div class="body">
<!--    翻页动画-->
   <div class="animation">
    <router-view v-slot="{ Component }">
      <transition :name="pageScale">
           <component :is="Component" />
      </transition>
    </router-view>
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
   width: 100%;
   min-height: 100vh;
   & div{
     width: 100%;
   }
 }
}

/* 翻页滑动动画 */
/* .slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}


.slide-enter-to {
  position: absolute;
  right: 0;
}


.slide-enter-from {
  position: absolute;
  right: -100%;
}


.slide-leave-to {
  position: absolute;
  left: -100%;
}


.slide-leave-from {
  position: absolute;
  left: 0;
}
 */


.scale-slide-back-enter-active,
.scale-slide-back-leave-active,
.scale-slide-go-enter-active,
.scale-slide-go-leave-active{
  position: absolute;
  transition: all 0.85s ease;
}

/*滑动组合动画 back（go-1)*/
.scale-slide-back-leave-from {
  left: 0;
  transform: scale(1);
  opacity: 1;
}

.scale-slide-back-leave-to {
  left: 100%;
  transform: scale(0.1);
}

.scale-slide-back-enter-from {
  left: -100%;
  transform: scale(0.1);
  opacity: 0;
}

.scale-slide-back-enter-to {
  left: 0;
  transform: scale(1);
  opacity: 1;
}

/*滑动组合动画 go（router)*/
.scale-slide-go-leave-from {
  transform: scale3d(1, 1, 1);
  opacity: 1;
  right: 0;
}
.scale-slide-go-leave-to {
  transform: scale3d(0.1, 0.1, 0.1);
  opacity: 0;
  right: 100%;
}
.scale-slide-go-enter-from {
  right: -100%;
}
.scale-slide-go-enter-to {
  right: 0;
}
</style>