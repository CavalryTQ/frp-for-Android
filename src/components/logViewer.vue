<script setup>
// 日志输出每行String流所代表的Dom
// logViewer.vue
import {ref, defineProps, watch, defineEmits, onMounted, nextTick} from "vue";
import logLine from "@/components/logLine.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () =>  Array.from({ length: 50 }, (_, i) => ({
      id: i,
      level: ['info', 'warn', 'error'][i % 3],
      FrpLine: `\u001b[0m\u001b[1;34m2025-06-14 13:40:36.869 [I] [sub/root.go:160] frpc service for config file [/data/user/0/icu.cavalry.frp/files/frpc/ddff.toml] stopped`
    }))
  },
  type: String,
});
const emit = defineEmits(["update:modelValue"]);

const LogLine = ref(logLine);
const LogViewer = ref(null);
const Logs = ref([...props.modelValue]);

console.log(props.modelValue);
watch(() => props.modelValue, (val) => {
  console.log('v-model',val);
  if (val) {
    nextTick(() => {

    });
  }
});

onMounted(()=>{
   nextTick(()=>{
   });
 });
</script>

<template>
 <div  class="logs" ref="LogViewer">
   <log-line v-for="item in props.modelValue" :key="item.id" :type="item.level" :log="item.FrpLine"></log-line>
 </div>
</template>

<style lang="scss">
.logs{
  height: calc(100vh - 300px) !important;
  color: var(--app-text-color);
  font-family: monospace;
  overflow-x: hidden;
  overflow-y: auto;
}


</style>