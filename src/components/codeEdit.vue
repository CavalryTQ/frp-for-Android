<script setup>
// codeMirror自定义组件实现
import {onMounted, ref, watch} from "vue";
import {EditorState} from "@codemirror/state";
import {basicSetup, EditorView} from "codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {userCache} from "@/data/cache.js";

const edit = ref();
const theme = ref(userCache.isDark.value ? oneDark : []);// 主题设置
const extensions = ref(
    [  basicSetup,// 基本编辑器设置
             javascript(), // JavaScript 语法支持
             theme.value
         ]);
const state = ref(EditorState.create({
  doc: "Hello World",
  extensions: extensions.value
}));
const view = ref(new EditorView({ /*parent: edit.value,*/ state: state.value}));
// 找到className为"cm-editor"的元素，并返回该元素。
 const cmEditor = document.querySelector(".cm-editor");

watch(userCache.isDark,(newValue)=>{
  theme.value = newValue ? oneDark : [];
  console.log('extensions',extensions.value);
  // edit.value.appendChild(view.value.dom);  TODO:  解决CodeMirror编辑器要根据用户喜好切换主题 2025-2-14
})

onMounted(() => {
  // edit.value.appendChild(view.value.dom);
  console.log('extensions',extensions.value);
  console.log(state.value);
  console.log(view.value);
});
</script>

<template>
 <div class="codeMirror-edit" ref="edit"></div>
</template>

<style scoped lang="scss">
  .codeMirror-edit {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
  }
  :deep(.cm-editor){
    height: 100% !important;
  }
</style>