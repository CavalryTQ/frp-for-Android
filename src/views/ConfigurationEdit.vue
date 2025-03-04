<script setup>
// 配置编辑页面，使用codemirror编辑器
import AppHeader from "@/components/appHeader.vue";
import CodeEdit from "@/components/tomlCodeEdit.vue";
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
 //import toml from "toml"; // 引入toml库解析
import axios from "axios";
import {userCache} from "@/data/cache.js";
import {dynamicModeIcon} from "@/mixins/mixin.js";
import {FileSystem} from "@/plugins/filesystem.js";
import {Directory, Encoding} from "@capacitor/filesystem";
import StatusToast from "@/components/statusToast.vue";

// TODO：用户退出当前路由未编辑完成的内容会清空，编辑器需要缓存未编辑完的内容，需要保存到本地 2025-2-14
const code = ref();
const saveIcon = ref(dynamicModeIcon('ic--baseline-save-w', 'ic--baseline-save-b'));
const editor = ref();
const prop = ref(false);

const loadData = async () => {
  const response = await axios.get(`/frpc.toml`);
  code.value = response.data;
  // const file = new FileSystem('/', 'Data');
  // await file.lsDir();

};

const handleSave = async () => {
    // if (editor.value){
    //   editor.value.getInputField().blur();
    //   const file = new FileSystem('/', 'Data');
    //   const res = await file.writeSecretFile({
    //       data: editor.value.getValue(),
    //       path: 'frpc.toml',
    //       directory Directory.Data,
    //       encoding: Encoding.UTF8,
    //       recursive: true
    //   });
    //   console.log('res', res);
    // }
  prop.value = !prop.value;
}
const handleBlur = (args) => {
    // 获取文本内容
    const text = editor.value.getValue();
    if(text && text !== code.value){
      userCache.set('config', text);
    }
}


loadData();
watch(userCache.isDark, () => {
  saveIcon.value = dynamicModeIcon('ic--baseline-save-w', 'ic--baseline-save-b')
});
watch(editor, (newValue)=>{
  console.log('editor', newValue);
});

onMounted( ()=>{
  nextTick(()=>{

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