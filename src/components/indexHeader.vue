<script setup>
// 首部头部
</script>

<template>
  <div class="index-header">
<!--    <img src="../../public/favicon.ico" alt="iocn"/>-->
    <div class="title">Frp - Fast Reverse Proxy</div>
  </div>
</template>

<style scoped lang="scss">
@media (orientation: landscape) {
  .index-header{
    width: 100%;
    height: calc(329 * var(--scale-factor-height)) !important;
    .title{
      font-size: 0.8rem !important;
      font-weight: 700;
    }
  }
}
.index-header{
  width: 100%;
  height: 329px;
  background: var(--app-background);
  display: flex;
  align-items: self-end;
  justify-content: center;
  overflow: hidden;
  .title{
    font-size: 1.25rem;
    font-weight: 700;
  }
}
</style>