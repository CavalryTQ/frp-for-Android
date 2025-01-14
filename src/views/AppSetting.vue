<script setup>
 // 应用设置
 import SwitchButton from "@/components/switchButton.vue";
 import AppHeader from "@/components/appHeader.vue";
 import {ref, watch} from "vue";
 import {userCache} from "@/data/cache.js";
 import {loadIcon} from "@/mixins/mixin.js";

 const modelText = ref(userCache.isDark ? '黑暗模式' : '明亮模式');
 const appModel = ref(userCache.isDark ? loadIcon('brightness-4') : loadIcon('brightness-5'));

 watch(userCache.isDark, (newValue) => {
    if (newValue){
      modelText.value = '黑暗模式';
      appModel.value = loadIcon('brightness-4');
    }else{
      modelText.value = '明亮模式';
      appModel.value = loadIcon('brightness-5');
    }
 });
</script>

<template>
  <div class="app-setting">
      <app-header></app-header>
    <form class="setting-content">
       <div class="setting-item">
         <label>
           <span>应用界面</span>
         </label>
         <div class="set-app-fun model">
           <div class="func-notice">
             <img :src="appModel" alt="appModel">
             <div class="notice">
               <span>{{modelText}}</span>
               <span>{{'总是黑暗模式'}}</span>
             </div>
           </div>
           <switch-button></switch-button>

                  <!--           下拉框         -->
            <div class="select-model">
              <ul>
                <li>
                  <label>
                    <input type="radio" name="model" value="dark" v-model="userCache.isDark">
                    <span class="radio-text">
                       <img :src="loadIcon('brightness-4')" alt="brightness-4">
                       <span class="radio-text-span"> always dark</span>
                     </span>
                  </label>
                </li>
              </ul>
            </div>

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
        .select-model{
          position: absolute;
          height: 200px;
          background: #1BA8CB;
          top: 9.78vh;
          z-index: 999;
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
      }
    }
  }
}
</style>