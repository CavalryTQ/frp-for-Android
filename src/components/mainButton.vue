<script setup>
import {ref, defineProps, watch, defineEmits} from "vue";
import {rippleEffect} from "@/animations/customAnimation.js";
import {loadIcon} from "@/mixins/mixin.js";
import {userCache} from "@/data/cache.js";

const props = defineProps({
  title: String,
  text: String,
  icon: String,
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
const isDarkModel = userCache.isDark || ref(window.matchMedia("(prefers-color-scheme: dark)").matches);
const icon = props.icon !== undefined ? ref(props.icon) : ref('');
const title = props.title !== undefined ? ref(props.title) : ref('功能名称');
const text = props.text !== undefined ? ref(props.text) : ref('功能描述');
const isActive = props.isActive !== undefined ? ref(props.isActive) : ref(false);

if (props.type){
  if (props.isActive){
    isDarkModel.value ? icon.value = loadIcon('circle-w') : icon.value = loadIcon('circle-b');
    title.value = '运行中';
    text.value = '点击停止';
    emit('isActive', true);
  }else {
    isDarkModel.value ? icon.value = loadIcon('block-w') : icon.value = loadIcon('block-b');
    title.value = '已停止';
    text.value = '点击启动';
    emit('isActive', false);
  }
}

watch(isDarkModel, (newValue, oldValue) =>{
  if (props.type){
    if (props.isActive){
      newValue ? icon.value = loadIcon('circle-w') : icon.value = loadIcon('circle-b')
    }else {
      newValue ? icon.value = loadIcon('block-w') : icon.value = loadIcon('block-b')
    }
  }
});
watch(isActive, (newValue, oldValue) =>{
  if (props.type){
    if (newValue){
      isDarkModel.value ? icon.value = loadIcon('circle-w') : icon.value = loadIcon('circle-b');
       title.value = '运行中';
       text.value = '点击停止';
       emit('isActive', true);
    }else {
      isDarkModel.value ? icon.value = loadIcon('block-w') : icon.value = loadIcon('block-b');
      title.value = '已停止';
      text.value = '点击启动';
      emit('isActive', false);
    }
  }
});

const handleActive = () =>{
  props.type ? isActive.value = !isActive.value : null;
}
</script>

<template>
  <div class="main-button" ref="mainBtn" @pointerdown="rippleEffect($event, mainBtn, {isDark: isDarkModel});handleActive();">
    <slot name="default">
      <div class="main-button-content">
        <div class="main-button-icon">
          <slot name="icon"><img style="width: 100%;height: 100%" :src="icon" alt="mainBtnIcon"></slot>
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