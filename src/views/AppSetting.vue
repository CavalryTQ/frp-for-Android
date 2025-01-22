<script setup>
 // 应用设置
 import SwitchButton from "@/components/switchButton.vue";
 import AppHeader from "@/components/appHeader.vue";
 import {nextTick, onMounted, ref, watch} from "vue";
 import {userCache} from "@/data/cache.js";
 import {loadIcon} from "@/mixins/mixin.js";
 import {rippleEffect} from "@/animations/customAnimation.js";
 import Model from "@/data/model.js";

 const appSetting = ref([
   {
     label: '应用界面',
     title: userCache.isDark.value ? '黑暗模式' : '明亮模式',
     text: '跟随系统Android 10+',
     icon: userCache.isDark.value ? loadIcon('brightness-4') : loadIcon('brightness-5'),
   },
   {
     label: '应用服务',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   },
   {
     label: '应用服务',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   },
   {
     label: '应用服务',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   },
   {
     label: '应用服务',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   },
   {
     label: '666',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   },
   {
     label: '666',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   }
 ]);
 const funcItem = ref(null);
 const selectModelRef = ref(null);
 const popup = ref(false);

 const handlePointerUpItem = (item) => {
   if (item.label === '应用界面') {
     popup.value = !popup.value;
   }
 };
const handlePinterUpModel = (type) => {
  switch (type) { // 0:跟随系统 1:总明 2:总暗
    case 0:
      userCache.isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      userCache.modelType.value = 0;
      Model.changeTheme(userCache.isDark.value);
      break;
    case 1:
      userCache.isDark.value = false;
      userCache.modelType.value = 1;
      Model.changeTheme(userCache.isDark.value);
      break;
    case 2:
      userCache.isDark.value = true;
      userCache.modelType.value = 1;
      Model.changeTheme(userCache.isDark.value);
      break;
  }
 };
 watch(userCache.isDark, (newValue) => {
     appSetting.value.forEach((item, index) => {
       switch (item.label){
         case "应用界面":
           item.title = newValue ? '黑暗模式' : '明亮模式';
           item.icon = newValue ? loadIcon('brightness-4') : loadIcon('brightness-5');
           // selectModelRef.value[index].style.background = newValue ? '#383737' : '#FFFFFF';
           break;
           case "应用服务":
             item.icon = newValue ? loadIcon('notes-w') : loadIcon('notes-b');
             break;
       }
     });

    // Model.changeTheme({isDark: newValue, css: `
    //            :deep(.select-model){
    //             background: ${newValue ? '#383737' : '#FFFFFF'};
    //           }
    // `});
 });
</script>

<template>
  <div class="app-setting">
      <app-header></app-header>
    <form class="setting-content">
       <div class="setting-item" v-for = "(item, index) in appSetting"
                                 :key = "item.label"
       >
         <label>
           <span>{{item.label}}</span>
         </label>
<!--    TODO:     @pointerdown="rippleEffect($event, funcItem[index], {isDark: userCache.isDark.value})"-->
         <div class="set-app-fun model" ref="funcItem"
              @pointerup="handlePointerUpItem(item)"
         >
           <div class="func-notice">
             <img :src="item.icon" alt="appModel">
             <div class="notice">
               <span>{{item.title}}</span>
               <span>{{item.text}}</span>
               <!--           下拉框         -->
              <transition name="select-model" mode="in-out">
                <div class="select-model" ref="selectModelRef" v-show="item.label === '应用界面' && popup">
                  <div class="select-item system" @pointerup="handlePinterUpModel(0)"><span>跟随系统(Android 10+)</span></div>
                  <div class="select-item dark" @pointerup="handlePinterUpModel(1)"><span>总是明亮模式</span></div>
                  <div class="select-item light" @pointerup="handlePinterUpModel(2)"><span>总是黑暗模式</span></div>
                </div>
              </transition>
             </div>
           </div>
           <div class="switchButton"> <switch-button  v-if="item.label !== '应用界面'"></switch-button></div>
         </div>
       </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@media (orientation: landscape) {
  img{
    width: calc(118 * var(--scale-factor-width)) !important;
    height: calc(118 * var(--scale-factor-width)) !important;
  }
  .app-setting{
    height: 100% !important;
    max-height: 100dvh;
    background: var(--app-background);
    padding: 0 min(calc(445 * var(--scale-factor-width)), 15%);
    overflow-x: hidden;
    overflow-y: hidden;
    .setting-content{
      width: 100%;
      height: auto;
      max-height: calc(100dvh - calc(300 * var(--scale-factor-width))) !important;
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 0 calc(60 * var(--scale-factor-width)) !important;
      .setting-item{
        display: flex;
        flex-direction: column;
        margin-bottom: calc(20 * var(--scale-factor-width));
        label{
          color: #1d4374;
          margin: calc(60 * var(--scale-factor-width)) 0 calc(60 * var(--scale-factor-width)) 0;
          padding-left: calc(150 * var(--scale-factor-width)) !important;
        }
        .set-app-fun{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-content: center;
          align-items: center;
          height: calc(263 * var(--scale-factor-height)) !important;

          .func-notice{
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: center;
            .notice{
              display: flex;
              flex-direction: column;
              margin-left: calc(30 * var(--scale-factor-width)) !important;
              .select-model{
                position: absolute;
                width: 70%;
                height: auto;
                top: calc(263 * var(--scale-factor-width)) !important;
                z-index: 999;
                border-radius: calc(10 * var(--scale-factor-width)) !important;
                padding: calc(10 * var(--scale-factor-width)) 0 !important;
                box-shadow: 0 0 calc(14 * var(--scale-factor-width)) 0 rgba(0, 0, 0, 0.10) !important;
                border: 1px solid var(--color-border);
                background: #FFFFFF;
                .select-item{
                  width: 100%;
                  height: calc(168 * var(--scale-factor-height)) !important;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-content: center;
                  padding: calc(30 * var(--scale-factor-width)) !important;
                }
              }
              span:last-child{
                font-size: calc(46 * var(--scale-factor-width)) !important;
              }
            }
          }

          .switchButton{
            position: relative;
            right: calc(70 * var(--scale-factor-width)) !important;
          }

        }
      }
    }
  }
}
img{
  width: 128px;
  height: 128px;
}
.app-setting{
  height: auto;
  max-height: 100dvh;
  background: var(--app-background);
  overflow-x: hidden;
  overflow-y: hidden;
  .setting-content{
    width: 100%;
    height: 100%;
    max-height: calc(100dvh - 400px);
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 60px;
    .setting-item{
      display: flex;
      flex-direction: column;
      label{
        color: var(--app-label-color);
        margin: 50px 0 60px 0;
        padding-left: 150px;
      }
      .set-app-fun{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        height: 9.78vh;
        position: relative;

        .func-notice{
          display: inline-flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: center;
          .notice{
            display: flex;
            flex-direction: column;
            margin-left: 30px;
            overflow: visible !important;
            .select-model{
              position: absolute;
              width: 70%;
              height: auto;
              top: 9.78vh;
              z-index: 99999999;
              border-radius: 10px;
              padding: 10px 0;
              box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.10);
              border: 1px solid var(--color-border);
              background: #FFFFFF;
              .select-item{
                width: 100%;
                height: 168px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                padding: 30px;
              }
            }
            span:last-child{
              font-size: 46px;
            }
          }
        }

        .switchButton{
          position: relative;
          right: 32px;
        }
      }

    }
  }
}

@media (prefers-color-scheme: dark) {
  .app-setting{
    .setting-content{
      .setting-item{
        label{
          /*TODO: LABEL样式写入css全局变量*/
          color: var(--label-color);
        }
        .model{
          .func-notice{
            .notice{
              .select-model{
                background: var(--app-label-color);
              }
            }
          }
        }
      }
    }
  }
}
</style>