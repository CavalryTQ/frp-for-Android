<script setup>
// 主要按钮
import {ref, defineProps, watch, defineEmits, onMounted, nextTick} from "vue";
import {rippleEffect} from "@/animations/customAnimation.js";
import {loadIcon} from "@/mixins/mixin.js";
import {userCache} from "@/data/cache.js";

const props = defineProps({
  title: String,
  text: String,
  icon: {
    type: String,
    default: undefined
  },
  type: {
    type: Boolean, // 是否为激活类型按钮
    default: false
  },
  isActive: {
    type: Boolean, // 是否为激活状态
    default: false
  },
});
const emit = defineEmits(['isActive']);

const mainBtn = ref(null);
const Icon = ref(props.icon !== undefined ? props.icon : '');
const title = props.title !== undefined ? ref(props.title) : ref('功能名称');
const text = props.text !== undefined ? ref(props.text) : ref('功能描述');
const isActive = props.isActive !== undefined ? ref(props.isActive) : ref(false);
const isDarkModel = userCache.isDark;

if (props.type){
  if (props.isActive){
    isDarkModel.value ? icon.value = loadIcon('circle-w') : icon.value = loadIcon('circle-b');
    title.value = '运行中';
    text.value = '点击停止';
    emit('isActive', true);
  }else {
    isDarkModel.value ? Icon.value = loadIcon('ic--baseline-block-w') : Icon.value = loadIcon('ic--baseline-block-b');
    title.value = '已停止';
    text.value = '点击启动';
    emit('isActive', false);
  }
}


watch(isActive, (newValue) =>{
  if (props.type){
    if (newValue){
      isDarkModel.value ? Icon.value = loadIcon('circle-w') : Icon.value = loadIcon('circle-b');
       title.value = '运行中';
       text.value = '点击停止';
       emit('isActive', true);
    }else {
      isDarkModel.value ? Icon.value = loadIcon('ic--baseline-block-w') : Icon.value = loadIcon('ic--baseline-block-b');
      title.value = '已停止';
      text.value = '点击启动';
      emit('isActive', false);
    }
  }
});

watch(isDarkModel, (newValue) =>{

  if (props.type){

    if (props.isActive){
      newValue ? Icon.value = loadIcon('circle-w') : Icon.value = loadIcon('circle-b')
    }else {
      newValue ? Icon.value = loadIcon('ic--baseline-block-w') : Icon.value = loadIcon('ic--baseline-block-b')
    }
  }
});
onMounted(async ()=>{
 await nextTick(() =>{
   // 监听props.icon的变化
    watch(()=> props.icon, (newValue)=>{
      Icon.value = newValue;
    })
 })
})

const handleActive = () =>{
  props.type ? isActive.value = !isActive.value : null;
}
</script>

<template>
  <div class="main-button" ref="mainBtn" @pointerdown="rippleEffect($event, mainBtn, {isDark: isDarkModel});handleActive();">
    <slot name="default">
      <div class="main-button-content">
        <div class="main-button-icon">
          <slot name="icon"><img style="width: 100%;height: 100%" :src="Icon" alt="mainBtnIcon"></slot>
        </div>
        <div class="main-button-text">
           <span><slot name="title">{{ title }}</slot></span>
          <span><slot name="text">{{ text }}</slot></span>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
@media (orientation: landscape) {
  .main-button{
    width: calc(1680 * var(--scale-factor-width)) !important;
    height: calc(298 * var(--scale-factor-height)) !important;
    border-radius: calc(30 * var(--scale-factor-width)) !important;
    .main-button-content{
      padding-left: calc(60 * var(--scale-factor-width)) !important;
      .main-button-icon{
        width: calc(128 * var(--scale-factor-width)) !important;
        height: calc(128 * var(--scale-factor-width)) !important;
      }
      .main-button-text{
        margin-left: calc(60 * var(--scale-factor-width)) !important;
        span:first-child{
          font-size: calc(49 * var(--scale-factor-width)) !important;
        }
        span:last-child{
          font-size: calc(40 * var(--scale-factor-width)) !important;
        }
      }
    }
  }
}
.main-button{
  box-sizing: border-box;
  width: 100%;
  height: 10.72vh;
  background: var(--app-btn-bg);
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.10);
  border-radius: 30px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  .main-button-content{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 60px;
    .main-button-icon{
      width: 128px;
      height: 128px;
    }
    .main-button-text{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 60px;
       span:first-child{
        font-size: 49px;
      }
       span:last-child{
         font-size: 40px;
       }
    }
  }
}
/*超出768*/
@media (min-width: 768px){
  .main-button{
    box-sizing: border-box;
    width: 1054px;
    height: 298px;
    background: var(--app-btn-bg);
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.10);
    border-radius: 30px;
    border: 1px solid var(--color-border);
    overflow: hidden;
  }
}
</style>