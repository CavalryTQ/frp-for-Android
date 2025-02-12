<script setup>
import {ref, watch} from "vue";
import AppHeader from "@/components/appHeader.vue";
import {userCache} from "@/data/cache.js";
import {loadIcon} from "@/mixins/mixin.js";

const fileIcon = ref(userCache.isDark.value ? loadIcon('file-w') : loadIcon('file-b'));
const urlIcon = ref(userCache.isDark.value ? loadIcon('download-w') : loadIcon('download-b'));

watch(userCache.isDark, (newValue) => {
  if (newValue){
    fileIcon.value = loadIcon('file-w');
    urlIcon.value = loadIcon('download-w');
  }else{
    fileIcon.value = loadIcon('file-b');
    urlIcon.value = loadIcon('download-b');
  }
});
</script>

<template>
  <div class="add-config">
    <app-header title="创建配置"></app-header>

    <div class="create-config">
      <div class="file-add add-group">
        <div class="add-icon">
          <img :src="fileIcon" alt="file" />
        </div>
        <div class="add-config-explain">
          <span class="add-config-title">文件</span>
          <span class="add-config-text">从文件导入</span>
        </div>
      </div>
      <div class="url-add add-group">
        <div class="add-icon">
          <img :src="urlIcon" alt="url" />
        </div>
        <div class="add-config-explain">
          <span class="add-config-title">URL</span>
          <span class="add-config-text">从URL导入</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.add-config{
  height: auto;
  .add-group{
    height: 272px;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0 60px;
    .add-icon{
      width: 96px;
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > img{
        width: 100%;
        height: 100%;
      }
    }
    .add-config-explain{
      margin-left: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      justify-items: self-end;
    }
  }
}
</style>