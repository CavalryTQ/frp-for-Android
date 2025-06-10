<script setup>
// 弹窗组件
import {ref, defineProps, defineEmits, computed} from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'textarea'].includes(value);
    },
  },
  modelValue: String,
});
const emit = defineEmits(['close', 'update:modelValue', 'confirm']);
// const value = computed(() => props.modelValue);

const closeDialog = () => {
  emit('close', false);
};
const handleBlur = (e) => {
  emit('update:modelValue', e.target.value);
};
const handleInput = (e) => {
  console.log('handleInput', e.target.value)
  emit('update:modelValue', e.target.value);
};
const handleConfirm = (e) => {
  console.log('handleConfirm', props.modelValue);
  emit('confirm', {event: e, value: props.modelValue});
  emit('close', false);
};
</script>

<template>
  <div class="dialog-cover"
       v-show="visible"
       @pointerdown="closeDialog"
  >
    <div class="dialog-box" @pointerdown.stop>
      <div class="dialog-title">
        <slot name="title"></slot>
      </div>
      <div class="dialog-textarea" v-if="type  === 'textarea'">
        <!--        <slot name="textarea">-->
        <span>请输入文件名</span>
        <input type="text" @blur="handleBlur($event)" @input="handleInput($event)"  :value="modelValue">
        <!--        </slot>-->
      </div>
      <div class="dialog-content" v-else>
        <slot name="content"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer">
          <span @pointerdown="closeDialog">取消</span>
          <span @pointerdown="handleConfirm($event)">确定</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .dialog-cover{
    position: fixed;
    background: rgb(0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .dialog-box{
      width: 1032px;
      height: auto;
      background: var(--app-btn-bg);
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 10px 10px 10px 10px;
      padding: 50px 90px;
      .dialog-title{
        color: var(--app-text-color);
        font-size: 55px;
      }
      .dialog-content{
        color: #b3b3b3;
        font-size: 45px;
      }
      .dialog-textarea{
        position: relative;
        margin: 60px 0;
        border: 1px  solid var(--app-label-color);
        span{
          position: absolute;
          display: block;
          margin-bottom: 20px;
          top: -50px;
          left: 40px;
          color: var(--app-label-color);
          font-size: 45px;
          z-index: 999;
          background: var(--app-btn-bg);
        }
        input{
          width: 100%;
          height: 100%;
          border-radius: 10px 10px 10px 10px;
          border: none;
          background: var(--app-btn-bg);
          color: var(--app-text-color);
          font-size: 45px;
          padding: 40px;
          border: 0;
        }
        input:focus{
          outline: none;
        }
      }
      .dialog-footer{
        display: flex;
        justify-content: flex-end;
        span{
          margin-left: 60px;
          color: var(--app-label-color);
          font-size: 45px;
          cursor: pointer;
        }
      }
    }
  }
</style>