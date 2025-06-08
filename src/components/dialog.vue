<script setup>
// 弹窗组件
import { ref, watch, onMounted, onUnmounted } from 'vue'

</script>

<template>
  <div class="dialog-cover">
    <div class="dialog-box">
      <div class="dialog-title">
        <slot name="title"></slot>
      </div>
      <div class="dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .dialog-cover{
    position: fixed;
    background: (0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 9999;

    
  }
</style>