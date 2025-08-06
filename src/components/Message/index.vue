<template>
  <transition
    name="fade"
    @before-leave="beforeClose"
    @leave="close"
    @after-leave="afterClose"
  >
    <div
      v-if="visible"
      :class="['yc-message', `yc-message-${position}`, className]"
      :style="style"
    >
      <div v-if="icon" class="yc-message-icon"></div>
      <div class="yc-message-content">{{ content }}</div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { MessageProps } from './type';
import { onMounted, ref } from 'vue';
import { sleep } from '@shared/utils';
const props = withDefaults(defineProps<MessageProps>(), {
  content: '',
  duration: 1500,
  className: '',
  position: 'center',
  style: () => ({}),
  beforeClose: () => {},
  close: () => {},
  afterClose: () => {},
});
const visible = ref<boolean>(false);
// 处理message消失
onMounted(async () => {
  visible.value = true;
  await sleep(props.duration);
  visible.value = false;
});
</script>

<style lang="less" scoped>
@import './style/message.less';
</style>
