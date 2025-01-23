<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue';
import {userCache} from "@/data/cache.js";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'bottom', // 校验，只允许bottom、top、left、right
    validator(value) {
      return ['bottom', 'top', 'left', 'right'].includes(value);
    },
  },
  enterDuration: {
    type: Number,
    default: 500, // 校验，只允许数字单位毫秒
    validator(value) {
      return value >= 0;
    },
  },
  leaveDuration: {
    type: Number,
    default: 500,
    validator(value) {
      return value >= 0;
    },
  },
});

const emit = defineEmits(['update:visible', 'close']);

const isDarkModel = userCache.isDark;

const closeDialog = () => {
  emit('update:visible', false);
  emit('close', false);
};

// 是否正在执行动画
const transitioning = ref(false);
const drawer = ref(null);

// 动画开始前的钩子
const beforeEnter = (e) => {
  e.style.transitionDuration = `${props.enterDuration}ms`;
  transitioning.value = true; // 开始动画
};
const beforeLeave = (e) => {
  e.style.transitionDuration = `${props.leaveDuration}ms`;
  transitioning.value = true; // 开始动画
};
// 动画结束后的钩子
const afterLeave = () => {
  transitioning.value = false; // 动画结束
};

watch(isDarkModel, (newValue) => {
  console.log('isDark', newValue)
})
</script>

<template>
  <div
      v-show="visible || transitioning"
      class="drawer-overlay"
      @pointerup="closeDialog"
  >
    <!-- 只为 drawer-content 添加动画 -->
    <transition :name="'drawer-content-' + props.direction"
                type="transition"
                @before-enter="beforeEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave"
    >
      <div
          v-if="visible"
          class="drawer-content"
          ref="drawer"
          :class="{'drawer-content-bottom': direction === 'bottom', 'drawer-content-top': direction === 'top', 'drawer-content-left': direction === 'left', 'drawer-content-right': direction === 'right'}"
          @pointerup.stop
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  /* 内容靠下对齐 display: flex;
  justify-content: center;
  align-items: center; */
}

/* 抽屉内容动画 */
.drawer-content {
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: var(--app-darwer-dialog-bg);
}
@media (prefers-color-scheme: dark){
  .drawer-content {
    background-color: var(--app-darwer-dialog-bg);
  }
}
.drawer-content-bottom{
  border-radius: 4vw 4vw 0 0;
  transform: translateY(50%); /* 保持最终状态 */
  transform-origin: bottom;
  /*flex顶部部对齐*/
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.drawer-content-top{
  border-radius: 0 0 4vw 4vw;
  transform: translateY(-50%);
  transform-origin: top;
  /*flex底部对齐*/
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.drawer-content-left{
  border-radius: 0 4vw 4vw 0;
  transform: translateX(-50%);
  transform-origin: left;
  /*flex右侧对齐*/
  display: flex;
  align-items: flex-start;
  float: right;
  justify-content: right;
}
.drawer-content-right{
  border-radius: 4vw 0 0 4vw;
  transform: translateX(50%);
  transform-origin: right;
  /*flex左侧对齐*/
  display: flex;
  align-items: flex-start;
  float: left;
  justify-content: left;
}

/* 动画相关 */
/* 底部抽屉 */
.drawer-content-enter-active,
.drawer-content-leave-active {
  transition: transform 5s ease-in-out;
}
.drawer-content-bottom-enter-from {
  transform: translateY(100%);
}
.drawer-content-bottom-enter-to {
  transform: translateY(50%);
}
.drawer-content-bottom-leave-to {
  transform: translateY(100%);
}
/*顶部抽屉.drawer-content-top-leave-from {
  transform: translateY(-150%);
}
*/
.drawer-content-top-enter-from {
  transform: translateY(-100%);
}
.drawer-content-top-enter-to {
  transform: translateY(-50%);
}
.drawer-content-top-leave-to {
  transform: translateY(-200%);
}

/*左侧抽屉*/
.drawer-content-left-enter-from {
  transform: translateX(-150%);
}
.drawer-content-left-enter-to {
  transform: translateX(-50%);
}
.drawer-content-left-leave-from {
  transform: translateX(-50%);
}
.drawer-content-left-leave-to {
  transform: translateX(-150%);
}

/*右侧抽屉*/
.drawer-content-right-enter-from {
  transform: translateX(150%);
}
.drawer-content-right-enter-to {
  transform: translateX(50%);
}
.drawer-content-right-leave-from {
  transform: translateX(50%);
}
.drawer-content-right-leave-to {
  transform: translateX(150%);
}
</style>
