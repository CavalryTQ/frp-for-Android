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
       <p>
          Fast Reverse Proxy 是一个快速、轻量级的反向代理服务器，支持 HTTP/HTTPS 协议。
          <br>
          <br>
          使用方法：
          <br>
          1. 将需要代理的网站域名添加到配置文件中。
          <br>
          2. 启动服务。
          <br>
          3. 访问 http://localhost:8080/[域名] 即可访问。
          <br>
          <br>
          支持的协议：
          <br>
          HTTP/HTTPS
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
     padding: 32px;
     text-align: center;
     background-color: var(--app-background);
     border-radius: 64px;
   }
 }
</style>