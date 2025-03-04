<script setup>

import {ref, defineExpose, defineProps, onMounted, nextTick, watch} from "vue";


// defineModel({
//   modelValue: {
//     type: Boolean,
//     default: false
//   }
// });

const props = defineProps({
  message: {
    type: String,
    default: '消息信息'
  },
  type: {
    type: String,
    default: 'success',
    validator(value) {
      return ['success', 'error', 'warning', 'info'].includes(value)
    }
  },
  isShow: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 1000
  },

});

const statusToast = ref(null);
const toastType = ref(props.type);
const toastDuration = ref(props.duration);
const isShow = ref(props.isShow);
const bgColor = ref('');


const initColor = () => {
  switch (toastType.value) {
    case 'success':
      bgColor.value = '#18CE33';
      break;
    case 'error':
      bgColor.value = '#F44336';
      break;
    case 'warning':
      bgColor.value = '#FF9800';
      break;
    case 'info':
      bgColor.value = '#2196F3';
      break;
  }
}
const initEnter = (el, done) => {
  el.style.transition = `all ${props.duration}ms`;
  el.style.opacity = 0;
  el.style.transform = 'translateY(-100%)';

  // el.style.opacity = 1;
  setTimeout(() => {
    // done();
    isShow.value = false;
  }, props.duration);
}
const initLeave = (el, done) => {
  el.style.transition = `all ${props.duration}ms`;
  el.style.transform = 'translateY(0)';
  // el.style.opacity = 0.5;
  // el.style.transform = 'translateY(0)';
  el.style.opacity = 1;
  // el.style.transform = 'translateY(-100%)';
  setTimeout(() => {
    // el.style.transform = 'translateY(-100%)';
    done();
  }, props.duration + 3000);
}

initColor();
defineExpose({
  type: toastType,
  duration: toastDuration,
  isShow: isShow
});

watch(()=>props.isShow, (newValue)=>{
    isShow.value = true;
})
onMounted(()=>{
  nextTick(()=>{
    statusToast.value.style.backgroundColor = bgColor.value;
  })
})
</script>

<template>
<transition name="toast" @enter="initEnter" @leave="initLeave" :duration="props.duration">
  <div class="toast" v-show="isShow" ref="statusToast">
    <span>{{props.message}}</span>
  </div>
</transition>
</template>

<style scoped lang="scss">
.toast{
  position: fixed;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  align-self: center;
  justify-self: center;
  top: 10%;
  z-index: 999999;
  padding: 30px 60px;
  border-radius: 30px 30px 30px 30px;
  span{
    color: rgb(241, 241, 241);
  }
}
.toast-enter-active, .toast-leave-active {
  transition: all;
}
//.toast-enter-from {
//  opacity: 0;
//  transform: translateY(-100%);
//}
//.toast-leave-to{
//  opacity: 0;
//  transform: translateY(-100%);
//}
</style>