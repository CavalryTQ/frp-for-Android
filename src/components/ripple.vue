<script setup>
import {  defineEmits} from 'vue';
import { rippleEffect } from '@/animations/customAnimation';

const emit = defineEmits(['pointerdown']);

const handlePointerDown = (e) =>{
  console.log('pointerdown',e)
  rippleEffect(e, e.target);
  emit('pointerdown', e);
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