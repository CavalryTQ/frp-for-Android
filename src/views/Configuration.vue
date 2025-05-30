<script setup>
// 配置列表页
import ConfigItem from "@/components/configItem.vue";
import AppHeader from "@/components/appHeader.vue";
import DrawerDialog from "@/components/drawerDialog.vue";
import {nextTick, onMounted, ref, watch} from "vue";
import {userCache} from "@/data/cache.js";
import {goToPage, loadIcon} from "@/mixins/mixin.js";
import {useRouter} from "vue-router";
import {FileSystem} from "@/plugins/filesystem.js";

const popup = ref(false);
const router = useRouter();
const renewIcon = ref(userCache.isDark.value ? loadIcon('auto renew-w') : loadIcon('auto renew-b'));
const addIcon = ref(userCache.isDark.value ? loadIcon('add-w') : loadIcon('add-b'));
const configFileList = new FileSystem('/frpc', 'Data', 'utf8', '', true);
const configList = ref([
  {
    name: 'default.toml',
    type:  'file',
    size: 0,
    ctime: 0,
    mtime: 0,
    uri: '/frpc/frpc.toml'
  }
]);

const handlePopup = (args) => {
  console.log(args, "handlePopup", popup.value);
  popup.value = args;
};
const closeDialog = () => {
  popup.value = false;
};
const handleAdd = async (args) => {
  goToPage(router,'/add_config');
};
const loadConfigFileList = async () => {
 const res = await configFileList.lsDir();
  console.log(res, "loadConfigFileList");
  if (res?.files && res.files.length > 0){
    configList.value = res.files;
  }else {
    configList.value = [
      {
        name: 'No File',
        type:  null,
        size: 0,
        ctime: 0,
        mtime: 0,
        uri: undefined
      }
    ];
  }
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

onMounted(()=>{
  nextTick(()=>{
    loadConfigFileList();
  });
})
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

<!--       <config-item></config-item>-->
<!--       <config-item></config-item>-->
       <config-item @handle-more="args => {
        handlePopup(args);
      }"
                    v-for="(item, index) in configList"
                    :key="item.uri"
                    :config-file="item"
       ></config-item>

     </form>
     <drawer-dialog :visible="popup" @close="args => {popup = args}" direction="bottom">
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