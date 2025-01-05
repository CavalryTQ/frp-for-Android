<script setup>
// 涟漪特效组件
import {defineEmits, defineProps, ref} from 'vue';
import { rippleEffect } from '@/animations/customAnimation';

const emit = defineEmits(['pointerdown']);
const props = defineProps({
  targetEl:{
    type: HTMLElement || NodeList,
    default: () => null
  }
});
// 获取是否为黑夜模式
const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
const handlePointerDown = (e) =>{
  console.log(e)
  rippleEffect(e, props.targetEl !== null ? props.targetEl : e.target, {isDark: isDarkMode.value});
  emit('pointerdown', {event: e, target: props.targetEl !== null ? props.targetEl : e.target});
}
</script>

<template>
  <div class="ripple-effect" @pointerdown="handlePointerDown">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.ripple-effect {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 100%;
}
</style>