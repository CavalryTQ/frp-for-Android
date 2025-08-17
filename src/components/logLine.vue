<script setup>
// logLine.vue
import {defineProps, nextTick, onMounted, ref} from 'vue'
import AnsiToHtml from 'ansi-to-html';
  const props = defineProps({
    log: String,
    isAnsi: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'warn', 'error'].includes(value)
    }
  });
const logLine = ref();
const ansiHtml = new AnsiToHtml().toHtml(props.log);
defineExpose({
  logLine
});
onMounted(()=>{
  nextTick(()=>{
   props.isAnsi ? logLine.value.innerHTML = ansiHtml : false;
  })
})
</script>

<template>
  <div class="log-line"
       :class="{'log-info': props.type === 'info', 'log-warn': props.type === 'warn', 'log-error': props.type === 'error'}"
       ref="logLine">{{props.log}}</div>
</template>

<style scoped lang="scss">
.log-line{
  padding: 20px 8px;
  cursor: pointer;
  user-select: text;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  color: var(--app-text-color);
  :deep(b){
    line-height: 1 !important;
    font-size: 30px !important;
  }
  //background: #00bb00 !important;
  &.log-info {
    color: #cccccc;
  }
  &.log-warn {
    color: #ffcc00;
  }
  &.log-error {
    color: #ff5555;
  }
}
</style>