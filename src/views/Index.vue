<script setup>
// app首页
import IndexHeader from "@/components/indexHeader.vue";
import MainButton from "@/components/mainButton.vue";
import FunctionGroup from "@/components/functionGroup.vue";
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import {userCache} from "@/data/cache.js";
import {goToPage, loadIcon} from "@/mixins/mixin.js";
import {useRouter} from "vue-router";
import About from "@/components/about.vue";
import  {BootFailedNotification, BootSuccessNotification} from "@/plugins/notifications.js";
import {LocalNotifications} from "@capacitor/local-notifications";
import { frp } from 'frp-plugin';
import FrpDialog from "@/components/frpDialog.vue";
import {getFrpcStatus, starFrpc, stopFrpc} from "@/frp/frpc.js";
import {Capacitor} from "@capacitor/core";

const router = useRouter();
const popupAbout = ref(false);
const content = ref(null);
const configBtn = ref();
const configIcon = userCache.isDark.value ? ref(loadIcon('view-w')) : ref(loadIcon('view-b'));
const outPutIcon  = userCache.isDark.value ? ref(loadIcon('play-w')) : ref(loadIcon('play-b'));
const dialog = ref(false);
const isActive = ref(false);
const configText = ref(userCache.selectFrpcConfigName.value ? userCache.selectFrpcConfigName.value + ' 已激活' : '无配置');
const outPut = ref([]);


const handlePointerUp = () => {
  goToPage(router, "/config");
}
const handleGoToLog = (info) => {
  goToPage(router, info.path)
}
const handleGoToSetting = (info) => {
  goToPage(router, info.path)
}
const handleLog = () => {
  console.log('outPut.value', outPut.value);
  goToPage(router, '/log');
}

const confirmActive = async () => {
  // console.log('beforeActive');
  const {status} =  await getFrpcStatus().catch(e => {
     isActive.value = false;
   });
   isActive.value = !status; // 状态取反
  console.log('Active前后最终状态：', isActive.value);
};
const handleActive = async () => {
  if (Capacitor.getPlatform() === 'android'){
    await confirmActive();
    console.log('点击推送通知');
    try {
      await frp.requestNotificationPermission({value: true});
    } catch (e) {
      // console.log('requestNotificationPermission error', e);
      if (e.message.includes('Redirected to settings')) {
        // alert('通知权限被永久拒绝，请前往设置手动开启。');
        dialog.value = true;
      } else {
        alert('通知权限请求失败：' + e.message);
      }
    }
    // console.log('申请通知权限结果：', result);

    if (isActive.value){
      const resultVPN = await frp.requestVpnPermission({value: true}).catch(e => {
        console.log('requestVpnPermission error', e);
        BootFailedNotification.schedule(
            {notifications: [{
                id: 2,
                title: "Frp应用启动失败",
                body: "Frp客户端应用启动失败，请允许vpn网络权限并重新开启。",
              }]});
      });
      console.log('申请vpn权限结果：', resultVPN);
      if (resultVPN?.granted || resultVPN?.status === 'granted'){ // 两种状态可放行，resultVPN?.status == 'granted'为用户首次授权，resultVPN?.granted为true为已授权状态
        const res = await starFrpc().catch(e => {
          BootFailedNotification.schedule(
              {notifications: [{
                  id: 1,
                  title: "Frp应用启动失败",
                  body: "Frp客户端应用启动失败，请检查网络或配置并重新开启。",
                }]});
        });
        console.log('启动frpc结果：', res)
      }
    }else {
      await stopFrpc().catch(e => {
        console.log('关闭frpc结果错误：', e);
      });
      await BootSuccessNotification.removeDeliveredNotifications();
      await BootFailedNotification.removeDeliveredNotifications();
       userCache.remove('syncLogs');
       userCache.remove('lastOutPut');
       userCache.tempLogs.value = [];
    }
  }else {
    console.log('当前平台：', Capacitor.getPlatform());
    console.log(configBtn.value);
  }
}
const handleConfirm = (args) => {
  frp.openAppSettings();
};

watch(userCache.isDark, (newValue) => {
  configIcon.value = newValue ? loadIcon('view-w') : loadIcon('view-b');
});

onMounted(() => {
  nextTick(()=>{
    configBtn.value.mainBtn.style.marginBottom = '0';
    getFrpcStatus().then(res => {
      console.log('获取到状态：', res);
      isActive.value = res.status;
      if (!isActive.value) {
        userCache.remove('syncLogs');
        userCache.remove('lastOutPut');
        userCache.tempLogs.value = [];
      }
    });
  });
  // 监听通知点击事件
 LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
    console.log('通知被点击:', JSON.stringify(notification, null, 2));
  });

});
onUnmounted(()=>{
  // frp.removeAllListeners();
})
</script>

<template>
  <div class="content">
    <index-header></index-header>
     <div class="body-content" ref="content">
       <mainButton :type="true" @pointerup="handleActive" :is-active="isActive"/>
       <mainButton v-if="isActive" @pointerup="handleLog()" v-model:icon="outPutIcon" title="输出" text="日志输出"></mainButton>
       <mainButton v-model:icon="configIcon" title="配置" :text="configText" @pointerup="handlePointerUp" ref="configBtn"/>
       <function-group @about="args => {popupAbout = args}"
                       @log="args => {handleGoToLog(args)}"
                       @setting="args => {handleGoToSetting(args)}"
       ></function-group>
     </div>
    <frp-dialog :visible="dialog"
                @close="args => {dialog = args}"
                @confirm="args => {handleConfirm(args)}"
    >
      <template #title>
        权限提示
      </template>
      <template  #content>
        通知权限被永久拒绝，请前往设置手动开启。
      </template>
    </frp-dialog>
    <about :show="popupAbout" @close="args => {popupAbout = args}"></about>
  </div>
</template>

<style scoped lang="scss">
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .body-content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 120px 105px 0 120px;
      :deep(.main-button){
        margin-bottom: 40px;
      }
      :deep(.func-group:last-child){
        margin-top: 30px;
      }
    }
  }

  @media (orientation: landscape) {
    .content{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .body-content{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //padding: calc(120 * var(--scale-factor-width)) calc(105 * var(--scale-factor-width)) 0 calc(120 * var(--scale-factor-width)) !important;
        padding: 0 calc(550 * var(--scale-factor-width));
        padding-top: calc(105 * var(--scale-factor-width));
        :deep(.main-button:first-child){
          margin-bottom: calc(60 * var(--scale-factor-width)) !important;
        }
        :deep(.func-group:last-child){
          margin-top: calc(30 * var(--scale-factor-width)) !important;
        }
      }
    }
  }

/*小于2040width 大于1480width*/
  @media ( min-width: 2040px) and (max-width: 1480px) {
    .content{
      .body-content{
        //padding: calc(120 * var(--scale-factor-width)) calc(105 * var(--scale-factor-width)) 0 calc(120 * var(--scale-factor-width)) !important;
        padding: 0 calc(350 * var(--scale-factor-width));
        padding-top: calc(105 * var(--scale-factor-width));
        :deep(.main-button:first-child){
          margin-bottom: calc(60 * var(--scale-factor-width)) !important;
        }
        :deep(.func-group:last-child){
          margin-top: calc(30 * var(--scale-factor-width)) !important;
        }
      }
    }
  }

  /*小于1480 大于764*/
  @media (min-width: 1480px) and (max-width: 764px) {
    .content{
      .body-content{
        padding: 0 calc(150 * var(--scale-factor-width));
        padding-top: calc(105 * var(--scale-factor-width));
      }
    }
  }

</style>