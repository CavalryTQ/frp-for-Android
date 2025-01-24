<script setup>
import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {goToPage, isBack} from "@/mixins/mixin.js";
import {Capacitor} from "@capacitor/core";
import { App } from '@capacitor/app';
import Model from "@/data/model.js";


const pageScale = ref('');
const router = useRouter();
const route = useRoute();

router.beforeEach((to, from, next) => {
    if (from.path === '/' && to.path === '/index'){
      // 初始化根路由重定向不需要加载动画
      pageScale.value = '';
      next();
    }else {
      isBack.value ? pageScale.value = 'scale-slide-back': pageScale.value = 'scale-slide-go';
      next();
    }
    return true;
});
router.afterEach(() => {
  isBack.value = true;
});

if(Capacitor.getPlatform() === 'android'){
  console.log('属于安卓平台！');
  // BackgroundRunner.dispatchEvent({label: 'icu.cavalry.frp', event: 'testEvent', details: {interval: 1}}).then(res => {
  //   console.log('dispatchEvent, 后台运行器事件监听成功！')
  //   console.log('res内容为：');
  //   console.log(JSON.stringify(res, null, 2));
  //   BackgroundRunner.requestPermissions().then(res => {
  //     console.log('requestPermissions, 后台运行器权限请求通知！')
  //   })
  // });
}

App.addListener( 'backButton', ()=>{
  console.log('backButton监听！');
  if (route.path === '/' || route.path === '/index') {
    App.minimizeApp();
  }else {
    goToPage(router, -1);
  }
}).then(res => {
}).catch(err => {
  console.log(JSON.stringify(err, null, 2));
});
const handleAppState = (state) => {
  if (state === 'active') {
    console.log('App is active');
  } else if (state === 'background') {
    console.log('App is in background');
  }
};
onMounted(()=>{
  nextTick(()=>{
    App.addListener('appStateChange', ({ isActive }) => {
      handleAppState(isActive ? 'active' : 'background');
    });
  })
});
onBeforeUnmount(() => {
  console.log('App.removeAllListeners')
  App.removeAllListeners();
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
  overflow-x: hidden;
  /*滑动隐藏滑动条*/
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  color: var(--app-text-color);
  height: 100dvh !important;
  &::-webkit-scrollbar {
    display: none !important;
  }
 .animation{
   width: 100%;
   overflow-y: scroll;
   overflow-x: hidden;
   display: flex;
   flex-direction: column;
   -ms-overflow-style: none !important;
   scrollbar-width: none !important;
   &::-webkit-scrollbar {
     display: none !important;
   }
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