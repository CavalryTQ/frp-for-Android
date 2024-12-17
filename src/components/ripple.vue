<script setup>
import {  defineEmits, defineProps} from 'vue';
import { rippleEffect } from '@/animations/customAnimation';

const emit = defineEmits(['pointerdown']);
const props = defineProps({
  targetEl:{
    type: HTMLElement,
    default: () => null
  }
})
const handlePointerDown = (e) =>{
  rippleEffect(e, props.targetEl !== null ? props.targetEl : e.target);
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
}
</style>