<script setup>
// 配置列表页
import ConfigItem from "@/components/configItem.vue";
import AppHeader from "@/components/appHeader.vue";
import DrawerDialog from "@/components/drawerDialog.vue";
import {ref} from "vue";

const popup = ref(false);
const handlePopup = (args) => {
  console.log(args, "handlePopup", popup.value);
  popup.value = args;
};
const closeDialog = () => {
  popup.value = false;
};
</script>

<template>
     <app-header></app-header>
  <form class="config-list">

      <config-item></config-item>
      <config-item></config-item>
      <config-item @handle-more="args => {
        handlePopup(args);
      }"></config-item>

    <p>test</p>
  </form>
  <drawer-dialog :visible="popup" >
    <div class="dialog">
      <h2>Drawer Content</h2>
      <button @click="closeDialog">Close</button>
    </div>
  </drawer-dialog>
</template>

<style scoped lang="scss">
 .config-list{
   width: 100%;
   height: auto;
   font-size: 16px;
 }
 .dialog{
   width: 100%;
   height: 50%;
   background: #1976D3;
 }
</style>