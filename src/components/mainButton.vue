<script setup>
import {ref, defineProps} from "vue";
import {rippleEffect} from "@/animations/customAnimation.js";

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
const mainBtn = ref(null);

</script>

<template>
  <div class="main-button" ref="mainBtn" @pointerdown="rippleEffect($event, mainBtn)">
    <slot name="default">
      <div class="main-button-content">
        <div class="main-button-icon">
          <slot name="icon"></slot>
        </div>
        <div class="main-button-text">
           <span><slot name="title">功能</slot></span>
          <span><slot name="text">功能状态</slot></span>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.main-button{
  box-sizing: border-box;
  width: 1054px;
  height: 10.72vh;
  background: var(--app-btn-bg);
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.10);
  border-radius: 30px;
  border: 1px solid var(--color-border);
  .main-button-content{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 70px;
    .main-button-icon{
      width: 128px;
      height: 128px;
      background: #30638E;
      border-radius: 50%;
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
</style>