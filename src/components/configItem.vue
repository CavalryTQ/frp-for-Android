<script setup>
// 配置列表Item
import {ref, defineProps, watch, defineEmits, onMounted, nextTick} from "vue";
import {userCache} from "@/data/cache.js";
import {rippleEffect} from "@/animations/customAnimation.js";
import {loadIcon} from "@/mixins/mixin.js";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
const props = defineProps({
   disabled: {
    type: Boolean,
    default: true
  },
  modelValue: String,
  value: String,
  configFile:{
     type: Object,
     default: () => {
       return   {
         name: 'default.toml',
         type:  'file',
         size: 0,
         ctime: 0,
         mtime: 0,
         uri: '/frpc/frpc.toml'
       }
     }
  }
});
const emit = defineEmits(['update:modelValue', 'handleMore']);

const configItem = ref(null);
const radioStyle = ref(null);
const isDarkMode = userCache.isDark;
const moreIcon = ref(isDarkMode.value ? loadIcon('more-w') : loadIcon('more-b'));
const isTarget = ref(false);
/**
 * radio样式切换
 * @param radio
 */
const handleRadioStyle = (radio) => {
  // console.log(props.modelValue);
  // console.log(props.value)
  // e.target.checked = true;
  // 获取radio disabled属性 disabled为true时不激活样式
 // TODO: 根据插件返回uri确定正在选中的配置 2025-06-04
  const checkedRadio = document.querySelectorAll('div[select-radio="config"]');
  checkedRadio.forEach(item => {
    const disabledAttr = item.attributes.getNamedItem('disabled');
    disabledAttr.nodeValue = "true";
    item.attributes.setNamedItem(disabledAttr); // 用于取消之前的样式
  });
// 激活样式
if (radio.attributes?.getNamedItem('disabled')){
  const newAttr = radio.attributes.getNamedItem('disabled');
  console.log(newAttr);
  newAttr.nodeValue = "false"
  radio.attributes.setNamedItem(newAttr);
}else {
  checkedRadio.forEach(item => {
    const inputValue = item.children[0].value;
    if (inputValue === props.modelValue){
      const disabledAttr = item.attributes.getNamedItem('disabled');
      disabledAttr.nodeValue = "false";
      item.attributes.setNamedItem(disabledAttr);
    }
    // disabledAttr.nodeValue = "false";
    // item.attributes.setNamedItem(disabledAttr);
  });
}
  isTarget.value = props.modelValue === props.value;
  emit('update:modelValue', props.value);
}

watch(isDarkMode, (newValue) => {
  newValue ? moreIcon.value = loadIcon('more-w') : moreIcon.value = loadIcon('more-b');
});
onMounted(()=>{
  nextTick( ()=>{
    setTimeout(() => {
      handleRadioStyle(radioStyle);
    }, 200);
  });
});
</script>

<template>
      <div class="config-item" ref="configItem" @pointerdown="rippleEffect($event, configItem, {isDark: isDarkMode})">
        <div class="item-left">
          <div class="radio" select-radio="config" disabled="true" ref="radioStyle">
            <input
                type="radio"
                id="config"
                name="config"
                :value="props.value"
                :checked="isTarget"
                @change="handleRadioStyle(radioStyle)"
            />
          </div>
          <label style="margin-left: 10px" for="kraken">{{ props.configFile.name }}</label>
        </div>
        <div class="item-right">
          <div class="last-time">{{ dayjs(props.configFile.mtime).fromNow()}}</div>
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
  transition: all 0.2s ease;
  transform: scale3d(1, 1, 1);
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

@media (orientation: landscape) {
  /*radio未选择样式*/
  input[type="radio"]{
    width: calc(64 * var(--scale-factor-width));
    height: calc(64 * var(--scale-factor-width));
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
    height: calc(272 * var(--scale-factor-height));
    display: flex;
    justify-content: space-between;
    text-align: left;
    line-height: calc(272 * var(--scale-factor-height));
    padding: 0 0 0 calc(60 * var(--scale-factor-width));
    .item-left{
      display: flex;
      align-items: center;
      label{
        font-size: calc(55 * var(--scale-factor-width));
      }
      .radio{
        width: calc(64 * var(--scale-factor-width));
        height: calc(64 * var(--scale-factor-width));
        display: flex;
        justify-content: center;
        align-items: center;
        border: calc(8 * var(--scale-factor-width)) solid #757575;
        border-radius: 50%;
        position: relative;
      }
      .radio[disabled="false"]{
        width: calc(64 * var(--scale-factor-width));
        height: calc(64 * var(--scale-factor-width));
        display: flex;
        justify-content: center;
        align-items: center;
        border: calc(8 * var(--scale-factor-width)) solid #1976D3;
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
        font-size: calc(44 * var(--scale-factor-width));
      }
      .line{
        width: 0;
        height: 50%;
        border-right: calc(0.5 * var(--scale-factor-width)) solid #DCDCDC;
        margin-left: calc(30 * var(--scale-factor-width));
      }
      .line-dark{
        width: 0;
        height: 50%;
        border-right: calc(0.5 * var(--scale-factor-width)) solid #414141;
        margin-left: calc(30 * var(--scale-factor-width));
      }

      .item-more{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 calc(60 * var(--scale-factor-width));
        img{
          width: 100%;
          height: calc(96 * var(--scale-factor-width)) !important;
          object-fit: contain;
        }
      }
    }

  }
}
</style>