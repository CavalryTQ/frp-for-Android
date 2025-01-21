<script setup>
// form 带 label的表单组件
import {rippleEffect} from "@/animations/customAnimation.js";
import {userCache} from "@/data/cache.js";
</script>

<template>
    <form class="setting-content">
      <div class="setting-item"

      >
        <label>
          <span>{{item.label}}</span>
        </label>
        <div class="set-app-fun model" ref="funcItem" @pointerdown="rippleEffect($event, funcItem[index], {isDark: userCache.isDark.value})">

        </div>
      </div>
    </form>
</template>

<style scoped lang="scss">

</style>