<template>
  <transition
    name="fade"
    @before-leave="beforeClose"
    @leave="close"
    @after-leave="afterClose"
  >
    <div v-if="visible" :class="['yc-message-box', className]" :style="style">
      <div v-if="icon" class="yc-message-box-icon"></div>
      <div class="yc-message-box-content">{{ content }}</div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { MessageProps } from './type';
import { onMounted, ref } from 'vue';
const props = withDefaults(defineProps<MessageProps>(), {
  content: '',
  duration: 1500,
  className: '',
  style: () => ({}),
  beforeClose: () => {},
  close: () => {},
  afterClose: () => {},
});
const visible = ref<boolean>(false);
onMounted(() => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
});
</script>

<style lang="less" scoped>
@import './style/message.less';
</style>
