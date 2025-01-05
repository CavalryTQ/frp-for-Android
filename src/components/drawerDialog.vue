<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);

const closeDialog = () => {
  emit('update:visible', false);
  // 关闭时触发动画
};

// 是否正在执行动画
const transitioning = ref(false);


// 动画开始前的钩子
const beforeEnter = () => {
  transitioning.value = true; // 开始动画
};

// 动画结束后的钩子
const afterLeave = () => {
  transitioning.value = false; // 动画结束
};
</script>

<template>
  <div
      v-show="visible || transitioning"
      class="drawer-overlay"
      @click="closeDialog"
  >
    <!-- 只为 drawer-content 添加动画 -->
    <transition name="drawer-content"
                @before-enter="beforeEnter"
                @after-leave="afterLeave"
    >
      <div
          v-show="visible"
          class="drawer-content"
          @click.stop
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
/* 遮罩层无动画 */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 内容靠下对齐 */
}

/* 抽屉内容动画 */
.drawer-content {
  width: 100%;
  height: 50%; /* 设置抽屉高度为屏幕的一半 */
  background-color: #fff;
  transform: translateY(0); /* 保持最终状态 */
}

/* 动画相关 */
.drawer-content-enter-active,
.drawer-content-leave-active {
  transition: transform 0.9s ease-in-out;
}

.drawer-content-enter-from {
  transform: translateY(100%);
}

.drawer-content-enter-to {
  transform: translateY(0);
}

.drawer-content-leave-from {
  transform: translateY(0);
}

.drawer-content-leave-to {
  transform: translateY(100%);
}
</style>
