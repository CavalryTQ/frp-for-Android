<script setup>
 // 应用设置
 import SwitchButton from "@/components/switchButton.vue";
 import AppHeader from "@/components/appHeader.vue";
 import {ref, watch} from "vue";
 import {userCache} from "@/data/cache.js";
 import {loadIcon} from "@/mixins/mixin.js";

 console.log(userCache.isDark.value);
 const appSetting = ref([
   {
     label: '应用界面',
     title: userCache.isDark.value ? '黑暗模式' : '明亮模式',
     text: '',
     icon: userCache.isDark.value ? loadIcon('brightness-4') : loadIcon('brightness-5'),
   },
   {
     label: '应用服务',
     title: '显示通知',
     text: '在通知中刷新流量',
     icon: userCache.isDark.value ? loadIcon('notes-w') : loadIcon('notes-b'),
   }
 ]);


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
       >
         <label>
           <span>{{item.label}}</span>
         </label>
         <div class="set-app-fun model">
           <div class="func-notice">
             <img :src="item.icon" alt="appModel">
             <div class="notice">
               <span>{{item.title}}</span>
               <span>{{item.text}}</span>
               <!--           下拉框         -->
               <div class="select-model" v-if="item.label === '666应用界面'">
                 <div class="select-item system"><span>跟随系统(Android 10+)</span></div>
                 <div class="select-item dark"><span>总是明亮模式</span></div>
                 <div class="select-item light"><span>总是黑暗模式</span></div>
               </div>
             </div>
           </div>
           <switch-button></switch-button>
         </div>
       </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
img{
  width: 128px;
  height: 128px;
}
.app-setting{
  height: auto;
  background: var(--app-background);
  .setting-content{
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 60px;
    .setting-item{
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      label{
        color: #1d4374;
        margin: 60px 0 80px 0;
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