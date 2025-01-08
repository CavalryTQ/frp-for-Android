<script setup>
// 配置列表Item
import {ref, defineProps, watch, defineEmits} from "vue";
import {userCache} from "@/data/cache.js";
import {rippleEffect} from "@/animations/customAnimation.js";
import {loadIcon} from "@/mixins/mixin.js";

const props = defineProps({
   disabled: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['handleMore']);

const configItem = ref(null);
const radioStyle = ref(null);
const isDarkMode = userCache.isDark;
const moreIcon = ref(isDarkMode.value ? loadIcon('more-w') : loadIcon('more-b'));

const handleRadioStyle = (e, radio) => {
  e.target.checked = true;
  // 获取radio disabled属性 disabled为true时不激活样式

  const checkedRadio = document.querySelectorAll('div[select-radio="config"]');
  checkedRadio.forEach(item => {
    const disabledAttr = item.attributes.getNamedItem('disabled');
    disabledAttr.nodeValue = "true";
    item.attributes.setNamedItem(disabledAttr);
  });

  const newAttr = radio.attributes.getNamedItem('disabled');
  newAttr.nodeValue = String(!e.target.checked);
  radio.attributes.setNamedItem(newAttr);

  // checkedRadio.forEach(item => {
  //   const disabledAttr = item.attributes.getNamedItem('disabled');
  //   console.log(disabledAttr);
  // });
}

watch(isDarkMode, (newValue) => {
  newValue ? moreIcon.value = loadIcon('more-w') : moreIcon.value = loadIcon('more-b');
});
</script>

<template>
      <div class="config-item" ref="configItem" @pointerdown="rippleEffect($event, configItem, {isDark: isDarkMode})">
        <div class="item-left">
          <div class="radio" select-radio="config" disabled="true" ref="radioStyle">
            <input type="radio" id="config" name="config" value="" @pointerdown="handleRadioStyle($event, radioStyle)"/>
          </div>
          <label style="margin-left: 10px" for="kraken">新配置1</label>
        </div>
        <div class="item-right">
          <div class="last-time">1小时前</div>
          <div :class="{'line': !isDarkMode, 'line-dark' : true}"></div>
          <div class="item-more" @pointerdown="emit('handleMore', true)"><img :src="moreIcon" alt="more"></div>
        </div>
      </div>
</template>

<style scoped lang="scss">
/*radio未选择样式*/
input[type="radio"]{
  width: 64px;
  height: 64px;
  appearance: none;
  position: absolute;
  border: none;
  border-radius: 50%;
}
/*radio确认样式*/
input[type="radio"]:checked{
  background: #1976D3;
  width: 60%;
  height: 60%;
  border: none;
  border-radius: 50%;
}


.config-item{
     width: 100%;
     height: 9.78vh;
     display: flex;
     justify-content: space-between;
     text-align: left;
     line-height: 9.78vh;
     padding: 0 0 0 60px;
     .item-left{
       display: flex;
       align-items: center;
       label{
         font-size: 55px;
       }
       .radio{
         width: 64px;
         height: 64px;
         display: flex;
         justify-content: center;
         align-items: center;
         border: 8px solid #757575;
         border-radius: 50%;
         position: relative;
       }
       .radio[disabled="false"]{
         width: 64px;
         height: 64px;
         display: flex;
         justify-content: center;
         align-items: center;
         border: 8px solid #1976D3;
         border-radius: 50%;
         position: relative;
       }
     }
     .item-right{
      display: flex;
       height: 100%;
      flex-direction: row;
       justify-content: center;
      align-content: center;
       align-items: center;
       .last-time{
         font-size: 44px;
       }
       .line{
         width: 0;
         height: 50%;
         border-right: 0.5px solid #DCDCDC;
         margin-left: 30px;
       }
       .line-dark{
         width: 0;
         height: 50%;
         border-right: 0.5px solid #414141;
         margin-left: 30px;
       }
       
       .item-more{
         height: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 0 60px;
         img{
           width: 100%;
           height: 96px !important;
           object-fit: contain;
         }
       }
     }

   }
</style>