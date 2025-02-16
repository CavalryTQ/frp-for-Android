<script setup>
// codeMirror自定义组件实现
import {nextTick, onMounted, ref, watch, defineProps, defineEmits, onUnmounted} from "vue";
import {userCache} from "@/data/cache.js";
import 'codemirror/mode/toml/toml';  // 引入 TOML 语言支持
import 'codemirror/lib/codemirror.css';  // 可选：引入 CodeMirror 样式
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css'
import CodeMirror from "codemirror";

const props = defineProps({
  modelValue: {
    type: String,
    default:
      `
serverAddr = ""
serverPort = 80


# http
[[proxies]]
name = "web"
type = "http"
localPort = 80
customDomains = [""]
      `
  },
});
const emit = defineEmits(['update:modelValue', 'change']);
console.log('codeEdit Value', props.modelValue);
const edit = ref();
let editor; // CodeMirror编辑器实例, 不要用vue任何的响应式状态管理，否则会出现预期外错误， codeMirror有自己响应缓存机制
const codeEditStyleEl = ref(document.createElement('style'));
codeEditStyleEl.value.type = 'text/css';
codeEditStyleEl.value.id = 'codeEditStyle';
const cmAtomCssLight = ref(`
.cm-atom {
  color: #a60000 !important;
}
`);
 codeEditStyleEl.value.innerHTML = cmAtomCssLight.value;

const handleClick = () => {
  // 延迟刷新视图并设置焦点，确保视图已渲染
  setTimeout(() => {
    if (editor) {
      editor.refresh();  // 强制刷新视图
      editor.focus();    // 设置焦点
      console.log(editor.getDoc());
    }
  }, 200);  // 延迟 200ms
};

watch(userCache.isDark,(newValue)=>{

  if (newValue){
    editor.setOption('theme', 'material-darker');
  }else{
    editor.setOption('theme', 'eclipse');
  }
})

onMounted(() => {
  nextTick(() =>{
    // 在 CSS 中定义对应的样式
  editor = CodeMirror(edit.value, {
      mode: "toml",
      lineNumbers: true,
      theme: userCache.isDark.value ? 'material-darker' : 'eclipse',
    });
    if (editor.options.theme === 'eclipse'){
      document.head.appendChild(codeEditStyleEl.value); // 将样式添加到页面的 head 中
    }
    editor.setValue(props.modelValue);
    setTimeout(()=>{
      // editor.setSize(100, 100)
      editor.refresh();
      editor.focus();
      console.log('editor',editor);
    }, 1000);

    // 监听 CodeMirror 内容变化并更新到父组件
    editor.on('change', (cm) => {
      emit('update:modelValue', cm.getValue());  // 向父组件传递更新的值
      emit('change', cm.getValue());
    });
  });
});

onUnmounted(() => {
   if (editor.options.theme === 'eclipse'){
     document.head.removeChild(codeEditStyleEl.value);
   }
  editor = null;
});
</script>

<template>
<!--  <textarea  v-model="code"></textarea>-->
  <!--  CodeMirror编辑器-->
 <div class="codeMirror-edit" ref="edit" @click="handleClick"></div>
</template>

<style scoped lang="scss">

  .codeMirror-edit {
    position: relative;
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    //@media (prefers-color-scheme: light){
    //  :deep(.cm-atom){
    //    color: #a60000;
    //  }
    //}
  }
:deep(.CodeMirror){
  display: flex;
  width: 100%;
  height: 100%;
}

</style>