<script setup>
// 配置列表页
import ConfigItem from "@/components/configItem.vue";
import AppHeader from "@/components/appHeader.vue";
import DrawerDialog from "@/components/drawerDialog.vue";
import {ref, watch} from "vue";
import {userCache} from "@/data/cache.js";
import {goToPage, loadIcon} from "@/mixins/mixin.js";
import {lsDir, mkDir, readFilePath, readSecretFile, writeSecretFile} from "@/plugins/filesystem.js";
import {Directory, Encoding} from "@capacitor/filesystem";
import {useRouter} from "vue-router";

const popup = ref(false);
const router = useRouter();
const renewIcon = ref(userCache.isDark.value ? loadIcon('auto renew-w') : loadIcon('auto renew-b'));
const addIcon = ref(userCache.isDark.value ? loadIcon('add-w') : loadIcon('add-b'));

const handlePopup = (args) => {
  console.log(args, "handlePopup", popup.value);
  popup.value = args;
};
const closeDialog = () => {
  popup.value = false;
};
const handleAdd = async (args) => {
// await mkDir({
//     path: '/Cavalry',
//     directory: Directory.Documents,
//     recursive: true,
//   });
// await writeSecretFile({
//     path: '/text.txt',
//     data: 'This is a test',
//     directory: Directory.Data,
//     encoding: Encoding.UTF8,
//     recursive: true,
//   });
//  await readFilePath({
//     path: '/',
//     directory: Directory.Data,
//     encoding: Encoding.UTF8,
//   });
//  await lsDir();
  goToPage(router,'/add_config');
};
watch(userCache.isDark, (newValue) => {
  if (newValue){
    renewIcon.value = loadIcon('auto renew-w');
    addIcon.value = loadIcon('add-w');
  }else{
    renewIcon.value = loadIcon('auto renew-b');
    addIcon.value = loadIcon('add-b');
  }
});
</script>

<template>
   <div class="config">
     <app-header title="配置">
       <template #right>
         <div class="auto-renew header-scoped"><img style="position: relative;z-index: -999;" :src="renewIcon" alt="auto-renew"/></div>
         <div class="add header-scoped" @pointerup="args => {handleAdd(args)}"><img :src="addIcon" alt="add"/></div>
       </template>
     </app-header>
     <form class="config-list">

       <config-item></config-item>
       <config-item></config-item>
       <config-item @handle-more="args => {
        handlePopup(args);
      }"></config-item>

<!--       <p>test</p>-->
     </form>
     <drawer-dialog :visible="popup" @close="args => {popup = args}" direction="bottom">
       <!--    <div class="dialog">-->
       <!--      <h2>Drawer Content</h2>-->
       <!--      <button @click="closeDialog">Close</button>-->
       <!--    </div>-->
       <h2>Drawer Content</h2>
       <button @click="closeDialog">Close</button>
     </drawer-dialog>
   </div>
</template>

<style scoped lang="scss">
@media (orientation: landscape) {
  .config{
    width: 100%;
    padding: 0 min(calc(445 * var(--scale-factor-width)), 15%);
    .config-list{
      width: 100%;
      height: auto;
      font-size: 16px;
    }
    .dialog{
      width: 100%;
      height: auto;
      background: #1976D3;
    }
  }
}
.config{
  width: 100%;
  .auto-renew{
    margin-right: 10px;
  }
  .config-list{
    width: 100%;
    height: auto;
    font-size: 16px;
  }
  .dialog{
    width: 100%;
    height: auto;
    background: #1976D3;
  }
}
</style>