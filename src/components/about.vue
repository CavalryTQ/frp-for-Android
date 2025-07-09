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
         GitHub: <a href="https://github.com/fatedier/frp">https://github.com/fatedier/frp</a>
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
   top: 0;
   left: 0;
   z-index: 9999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
   .about-body{
     width: 85%;
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