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
      /* 字号必须与容器高度同源，否则会被头部的 overflow:hidden 裁掉。
         原来写 0.8rem：rem 跟的是 :root 字号，而容器高度跟的是 --scale-factor-height，
         两个变量一旦分叉就失配。改用「设计稿 px × 缩放因子」直接绑定到同一个旋钮，
         100 = 设计稿 px，与竖屏取值一致。 */
      font-size: calc(100 * var(--scale-factor-width)) !important;
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
    /* 原为手写 1rem。引入根字号缩放后 rem 从「固定 16px」变成「随舞台变化」，
       语义已漂移；改用设计稿 px 表达，与周围由 postcss 转换出来的值保持同一口径。 */
    font-size: calc(100 * var(--scale-factor-width));
    font-weight: 700;
  }
}
</style>