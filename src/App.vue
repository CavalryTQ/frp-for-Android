<script setup>

import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import Configuration from "@/views/Configuration.vue";
import Log from "@/views/Log.vue";

const pageFade = ref('');
const router = useRouter();
const isBack = ref(false);

watch(isBack, (newValue)=>{
  console.log('isBack', newValue)
});
onMounted(()=>{
  window.addEventListener('popstate', (event) => {
    isBack.value = true;
    console.log('isBack');
  });
});

</script>

<template>
  <div class="body">
<!--    翻页动画-->
   <div class="animation">
    <router-view v-slot="{ Component }">
      <transition name="scale-slide">
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
   width: 100%;
   min-height: 100vh;
   & div{
     width: 100%;
   }
 }
}

/* 翻页滑动动画 */
.slide-enter-active,
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


/*滑动组合动画（go-1)*/
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-leave-from {
  right: 0;
}

.scale-slide-leave-to {
  right: 100%;
}

.scale-slide-enter-from {

  transform: scale(0.1);
  opacity: 0;
}

.scale-slide-enter-to {
  transform: scale(1);
  opacity: 1;
}

</style>