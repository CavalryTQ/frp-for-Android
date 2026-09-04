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
  console.log(from.path === to.path, from.path, to.path);
    if (from.path === '/'){
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

// new WriteFileOptions('index.html', 'DOCUMENTS', 'utf8', '', true);
App.addListener( 'backButton', ()=>{
  console.log('backButton监听！');
  if (route.path === '/' || route.path === '/index') {

    App.minimizeApp();// 应用最小化
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
window.addEventListener('nativeMessage', (event) => {
  console.log('收到来自原生的消息：', event.detail);
  // 根据 event.detail 执行相应的逻辑

});

onMounted(()=>{
  nextTick(()=>{
    console.log(Capacitor.getPlatform());
    if(Capacitor.getPlatform() === 'android'){
      console.log('属于安卓平台！');

      App.addListener('appStateChange', (state) => {
        console.log('app状态：',JSON.stringify(state, null, 2));
        const isActive = state.isActive;
        handleAppState(isActive ? 'active' : 'background');
      });
    }
  })
});
onBeforeUnmount(() => {
  console.log('App.removeAllListeners')
  window.removeEventListener('nativeMessage', (event) => {});
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
/* base.css 已由 main.js -> main.css 全局引入；
   在 scoped 样式里重复 @import 会生成 :root[data-v-xxx] 等永远匹配不到 <html> 的死规则，
   并干扰新增的 --app-stage-* 适配变量，故移除。 */
.body{
  box-sizing: border-box;
  /* 作为翻页动画中 position:absolute 元素的包含块。
     不设时包含块是初始包含块（=整个视口），平板上动画期间页面会撑到全视口宽。
     注意：必须放在 .body 而不是 .animation —— 动画期间 .animation 子元素全部脱离文档流，
     其高度塌缩为 0，若由它做包含块，它自带的 overflow-y:scroll 会把动画元素整体裁掉。
     position:relative + z-index:auto 不创建层叠上下文，不影响内部 fixed 弹层的 z-index。 */
  position: relative;
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
  transition: all 0.5s ease;
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