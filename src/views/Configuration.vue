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
   <div class="config">
     <app-header></app-header>
     <form class="config-list">

       <config-item></config-item>
       <config-item></config-item>
       <config-item @handle-more="args => {
        handlePopup(args);
      }"></config-item>

       <p>test</p>
     </form>
     <drawer-dialog :visible="popup" @close="args => {popup = args}" direction="bottom">
       <!--    <div class="dialog">-->
       <!--      <h2>Drawer Content</h2>-->
       <!--      <button @click="closeDialog">Close</button>-->
       <!--    </div>-->
       <h2>Drawer Content</h2>
       <button @click="closeDialog">Close</button>
     </drawer-dialog>
   </div>
</template>

<style scoped lang="scss">
@media (orientation: landscape) {
  .config{
    width: 100%;
    padding: 0 calc(445 * var(--scale-factor-width));
    .config-list{
      width: 100%;
      height: auto;
      font-size: 16px;
    }
    .dialog{
      width: 100%;
      height: auto;
      background: #1976D3;
    }
  }
}
.config{
  width: 100%;
  .config-list{
    width: 100%;
    height: auto;
    font-size: 16px;
  }
  .dialog{
    width: 100%;
    height: auto;
    background: #1976D3;
  }
}
</style>