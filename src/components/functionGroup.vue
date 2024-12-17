<script setup>
import {ref} from "vue";
import Ripple from "@/components/ripple.vue";

const funcBtn = ref(null);

</script>

<template>
  <ripple :target-el="funcBtn">
      <div class="func-group">
        <div class="func-button" @pointerdown.self="true" ref="funcBtn">
          <div class="func-icon"></div>
          <div class="func-text">设置</div>
        </div>
      </div>
  </ripple>
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