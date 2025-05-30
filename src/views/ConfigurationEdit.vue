<script setup>
// 配置编辑页面，使用codemirror编辑器
import AppHeader from "@/components/appHeader.vue";
import CodeEdit from "@/components/tomlCodeEdit.vue";
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
 //import toml from "toml"; // 引入toml库解析
import axios from "axios";
import {userCache} from "@/data/cache.js";
import {dynamicModeIcon} from "@/mixins/mixin.js";
import {FileSystem, frpcConfigFile} from "@/plugins/filesystem.js";
import StatusToast from "@/components/statusToast.vue";
import {Directory} from "@capacitor/filesystem";

// TODO：用户退出当前路由未编辑完成的内容会清空，编辑器需要缓存未编辑完的内容，需要保存到本地 2025-2-14
const code = ref();
const saveIcon = ref(dynamicModeIcon('ic--baseline-save-w', 'ic--baseline-save-b'));
const editor = ref();
const prop = ref(false);
// const frpcConfigFile = new FileSystem('/frpc/frpc.toml', 'Data', 'UTF8', '', true);
// const frpsConfigFile = new ReaddirOptions('/frpc', 'Data');

const loadData = async () => {
  const res = await frpcConfigFile.lsDir({
    path: '/frpc',
    directory: Directory.Data,
  });
  const response = await axios.get(`/frpc.toml`);
  if (res.code === 0){
    code.value = response.data;
  }else {
    const sourceCode = await frpcConfigFile.readSecretFile();
    console.log('读取文件内容', sourceCode.data);
    code.value = sourceCode.data;
    if (!sourceCode.data){
      code.value = response.data;
    }
  }




};

const handleSave = async () => {
    if (editor.value){
      editor.value.getInputField().blur();
     await frpcConfigFile.setData(editor.value.getValue());
     const res = await frpcConfigFile.writeSecretFile();
     frpcConfigFile.setReadDirOptions({path: '/frpc', directory: 'Data'});
      console.log(res.message)
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



watch(userCache.isDark, () => {
  saveIcon.value = dynamicModeIcon('ic--baseline-save-w', 'ic--baseline-save-b')
});
watch(editor, (newValue)=>{
  console.log('editor', newValue);
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