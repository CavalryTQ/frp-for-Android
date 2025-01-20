<script setup>
 // 应用设置
 import SwitchButton from "@/components/switchButton.vue";
 import AppHeader from "@/components/appHeader.vue";
 import {nextTick, onMounted, ref, watch} from "vue";
 import {userCache} from "@/data/cache.js";
 import {loadIcon} from "@/mixins/mixin.js";
 import {rippleEffect} from "@/animations/customAnimation.js";

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

 watch(userCache.isDark, (newValue) => {
     appSetting.value.forEach((item) => {
       switch (item.label){
         case "应用界面":
           console.log('新值：', newValue)
           item.title = newValue ? '黑暗模式' : '明亮模式';
           item.icon = newValue ? loadIcon('brightness-4') : loadIcon('brightness-5');
           break;
           case "应用通知":
             item.icon = newValue ? loadIcon('notes-w') : loadIcon('notes-b');
             break;
       }
     })
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
         <div class="set-app-fun model" ref="funcItem" @pointerdown="rippleEffect($event, funcItem[index], {isDark: userCache.isDark.value})">
           <div class="func-notice">
             <img :src="item.icon" alt="appModel">
             <div class="notice">
               <span>{{item.title}}</span>
               <span>{{item.text}}</span>
               <!--           下拉框         -->
               <div class="select-model" v-if="item.label === '应用界面'">
                 <div class="select-item system"><span>跟随系统(Android 10+)</span></div>
                 <div class="select-item dark"><span>总是明亮模式</span></div>
                 <div class="select-item light"><span>总是黑暗模式</span></div>
               </div>
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
    overflow-x: visible;
    overflow-y: hidden;
    .setting-content{
      width: 100%;
      height: auto;
      max-height: calc(100dvh - calc(300 * var(--scale-factor-width))) !important;
      flex: 1;
      overflow-x: visible;
      overflow-y: scroll;
      padding: 0 !important;
      margin: 0 calc(60 * var(--scale-factor-width)) !important;
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
            right: calc(30 * var(--scale-factor-width)) !important;
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
  overflow-x: visible;
  overflow-y: hidden;
  .setting-content{
    width: 100%;
    height: 100%;
    max-height: calc(100dvh - 400px);
    overflow-x: visible;
    overflow-y: scroll;
    padding: 0 60px;
    .setting-item{
      display: flex;
      flex-direction: column;
      label{
        color: #1d4374;
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

      .model{
        position: relative;
        .func-notice{
          .notice{
            .select-model{
              position: absolute;
              width: 70%;
              height: auto;
              top: 9.78vh;
              z-index: 999;
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
          }
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
          color: #1974cd;
        }
        .model{
          .func-notice{
            .notice{
              .select-model{
                background: #383737;
              }
            }
          }
        }
      }
    }
  }
}
</style>