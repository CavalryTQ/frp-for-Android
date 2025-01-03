<script setup>
import {ref, defineEmits, defineProps,defineOptions ,onMounted, nextTick} from 'vue';
const dialogElement = ref(null);
const dialogBox = ref(null);
const props = defineProps({
  title: {
    type: String,
    default: 'Dialog Title',
  },
  visible: {
    type: Boolean,
    default: true,
  },
});
defineOptions({name: 'CustomDialog'})
const emit = defineEmits(['update:visible', 'confirm']);

const closeDialog = () => {
  emit('update:visible', false);
};

const handleOverlayClick = () => {
  closeDialog();
};

const confirm = () => {
  emit('confirm');
  closeDialog();
};

onMounted(()=>{
  nextTick(()=>{
    console.log('document', dialogElement.value)
  })
})
defineExpose({
  props: props,
  title: props.title,
  visible: props.visible,
  dialogBox,
  ref
});

</script>


<template>
  <div v-show="visible"  ref="dialogElement" class="drawer-dialog-overlay" @click="handleOverlayClick">
    <div class="drawer-dialog" ref="dialogBox" tabindex="-1" @click.stop>

    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-dialog-overlay {
  position: fixed;

}
</style>