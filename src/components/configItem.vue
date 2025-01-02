<script setup>
// 配置列表Item
import {ref} from "vue";

const configItem = ref(null)
// config radio 选中样式
const radioStyle = ref(null)
const handleRadioStyle = (e) => {
  e.target.checked = true;
  // {
  //   width: '64px',
  //       height: '64px',
  //     margin: '0 4px 0 0',
  //     appearance: 'none',
  //     position: 'relative',
  //     border: '10px solid #30638e',
  //     borderRadius: '50%'
  // };
  // 获取id=config checked为 true 的input[type="radio"] 列表
  const checkedRadio = document.querySelectorAll('div[select-radio]');
  console.log(checkedRadio)
  checkedRadio.forEach(item => {
    console.log(item);
  })
}
</script>

<template>
  <div class="config-item" ref="configItem">
    <div class="item-left">
      <div class="radio" select-radio="config">
        <input type="radio" id="config" name="config" value="" @pointerdown="handleRadioStyle($event)"/>
      </div>
      <label style="margin-left: 10px" for="kraken">新配置1</label>
    </div>
    <div class="item-right">
      <div class="last-time">1小时前</div>
      <div class="delete">删除</div>
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
  background: #30638e;
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
     .item-left{
       display: flex;
       align-items: center;
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
     }
     .item-right{
      display: flex;
      flex-direction: row;
     }
   }
</style>