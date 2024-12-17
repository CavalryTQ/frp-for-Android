<script setup>

import {rippleEffect} from "@/animations/customAnimation.js";
</script>

<template>
  <div class="func-group">
    <div class="func-button" @pointerdown="rippleEffect($event, $event.target)">
      <div class="func-icon" @pointerdown.stop = "true"></div>
      <div class="func-text" @pointerdown.stop = "true">设置</div>
    </div>
  </div>
</template>

<style scoped>
  .func-group{
    box-sizing: border-box;
    width: 1054px;
    height: auto;
    display: flex;
    flex-direction: column;
    .func-button{
      width: 100%;
      height: 211px;
      background-color: #ffb800;
      display: flex;
      align-items: center;
      .func-icon{
        width: 128px;
        height: 128px;
        background-color: #30638E;
        margin-left: 70px;
      }
      .func-text{
        margin-left: 60px;
        font-size: 49px;
      }
    }
  }
</style>