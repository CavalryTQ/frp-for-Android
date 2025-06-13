<script setup>
// 配置编辑页面，使用codemirror编辑器
import AppHeader from "@/components/appHeader.vue";
import CodeEdit from "@/components/tomlCodeEdit.vue";
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
 //import toml from "toml"; // 引入toml库解析
import axios from "axios";
import {userCache} from "@/data/cache.js";
import {dynamicModeIcon, getCurrentRouteQuery} from "@/mixins/mixin.js";
import {frpcConfigDir, frpcConfigFile} from "@/plugins/filesystem.js";
import StatusToast from "@/components/statusToast.vue";
import {loadFrpcConfigFile, loadFrpcConfigDir, saveConfigFile} from "@/plugins/configMethods.js";
import {useRoute} from "vue-router";
import {cloneDeep} from "lodash/lang.js";
import FrpDialog from "@/components/frpDialog.vue";

// TODO：用户退出当前路由未编辑完成的内容会清空，编辑器需要缓存未编辑完的内容，需要保存到本地 2025-2-14
const code = ref();
const saveIcon = ref(dynamicModeIcon('ic--baseline-save-w', 'ic--baseline-save-b'));
const editor = ref();
const prop = ref(false);
const routeQuery = getCurrentRouteQuery(useRoute(), 'file');
const show = ref(false);
const dialogType = ref( 'normal'); // textarea normal
const value  = ref('');

const loadData = async () => {
  console.log('当前路由参数：', routeQuery);
  // alert('加载配置文件' + JSON.stringify(routeQuery));
  const res = await routeQuery?.uri ? {code: 1} : {code: 0};
  const response = await axios.get(`/frpc.toml`);
  if (res.code === 0){
    code.value = response.data;
  }else {
    const readFileOptions = cloneDeep(frpcConfigFile.readFileOptions);
    const uri = routeQuery.uri;
    const base = '/files';
    const index = uri.indexOf(base);
    routeQuery?.uri ?  readFileOptions.path = uri.substring(index + base.length) : readFileOptions.path = '/frpc/frpc.toml';
    console.log('readFileOptions', readFileOptions);
    const sourceCode = await loadFrpcConfigFile(readFileOptions);
    console.log('读取文件内容', sourceCode.data);
    code.value = sourceCode.data;
    if (!sourceCode.data){
      code.value = response.data;
    }
  }
};

const handleSave = async () => {
    if (editor.value){
      editor.value.getInputField().blur(); // 触发blur事件
      if (routeQuery?.uri){
        console.log('写入已有文件', routeQuery.uri, routeQuery.name);
         await saveConfigFile(routeQuery.name, editor.value.getValue())
      }else {
        console.log('保存新文件')
        dialogType.value  = 'textarea';
        show.value = true;
      }
     // await frpcConfigFile.setData(editor.value.getValue());
     // const res = await frpcConfigFile.writeSecretFile();
     // frpcConfigFile.setReadDirOptions({path: '/frpc', directory: 'Data'});
     //  console.log(res.message)
    }
  prop.value = !prop.value;
}
const handleBlur = (args) => {
    // 获取文本内容
    const text = editor.value.getValue();
    if(text && text !== code.value){
      userCache.set('configCache', text);
    }
}
const handleConfirm = (args) => {
  console.log('handleConfirm', args.value);
  saveConfigFile(args.value + '.toml', editor.value.getValue()).then(res => {
    console.log(res);
  }).catch(e=>{
    console.log(e);
  });
};


watch(userCache.isDark, () => {
  saveIcon.value = dynamicModeIcon('ic--baseline-save-w', 'ic--baseline-save-b')
});

onMounted( ()=>{
  nextTick(()=>{
    loadData();
  });
});

onUnmounted(()=>{
  code.value = null;
});
</script>

<template>
  <div class="config-edit">
    <app-header title="配置编辑">
      <template #right>
        <div class="config-edit-save-btn header-scoped" @pointerup="handleSave">
          <img :src="saveIcon" alt="save"/>
        </div>
      </template>
    </app-header>
    <status-toast :is-show="prop"/>
    <frp-dialog v-model="value" :type="dialogType"
                :visible="show"
                @close="args => {show = args}"
                @confirm="args => {handleConfirm(args)}"
    >
      <template #title>
        保存配置文件
      </template>
      <template #content></template>
    </frp-dialog>
    <div class="config-edit-content">
       <code-edit v-model="code" @blur="args => {handleBlur(args)}" v-model:editor-options="editor" ></code-edit>
    </div>
<!--    <div class="config-edit-save">-->
<!--      <img style="width: 100%;height: 100%" :src="saveIcon" alt="save"/>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">


.config-edit{
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .config-edit-content{
    display: flex;
  }

}


</style>