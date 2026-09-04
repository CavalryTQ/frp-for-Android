<script setup>
// 《关于》模态框

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['close']);

const close = () => {
  emit('close', false);
};
const handleClose = (e) => {
  if (e.target === e.currentTarget) {
    close();
  }
};
</script>

<template>
  <div class="about-dialog" v-if="props.show" @pointerdown="handleClose">
    <div class="about-body" @pointerdown.stop>
       <h2>Fast Reverse Proxy</h2>
      <br>
       <p>
         A fast reverse proxy to help you expose a local server behind a NAT or firewall to the internet.
          <br>
         <br>
         GitHub: <a href="https://github.com/fatedier/frp">https://github.com/fatedier/frp</a>
         <br>
         <br>
         UI Ref: Clash for Android
         <br>
         <br>
         core version: {{ '0.61.0' }}
       </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
 .about-dialog{
   position: fixed;
   /* 遮罩铺满真实视口，与舞台宽度解耦；inset 不受滚动条宽度影响，避免 100vw 横向溢出 */
   inset: 0;
   z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
   .about-body{
     width: 85%;
     /* 85% 是相对遮罩（=视口）算的，会绕过 rem 封顶；
        按舞台宽度二次封顶，手机上舞台=100vw，结果与原来完全一致 */
     max-width: calc(var(--app-stage-width) * 0.85);
     height: auto;
     display: flex;
     flex-direction: column;
     padding: 50px;
     text-align: center;
     background-color: var(--app-btn-bg);
     border-radius: 64px;
   }
 }
</style>