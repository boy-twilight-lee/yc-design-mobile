<template>
  <div class="container">
    <yc-button @click="visible = true">测试</yc-button>
    <yc-floating-popup
      v-model:visible="visible"
      title="测认识"
      header-left-text="清空"
    >
    </yc-floating-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTouch, useSwipe, valueToPx, sleep } from '@shared/utils';

const visible = ref<boolean>(true);
const height = ref<number>(200);
const containerRef = ref<HTMLDivElement>();
const triggerRef = ref<HTMLButtonElement>();
useTouch(containerRef, {
  onStart() {
    if (!containerRef.value) return;
    containerRef.value!.style.transition = 'none';
  },
  onMove({ y }) {
    if (!containerRef.value) return;
    const { top } = containerRef.value.getBoundingClientRect();
    height.value = y - top;
  },
  onEnd: async () => {
    if (!containerRef.value) return;
    height.value = height.value >= 300 ? 300 : height.value;
    height.value = height.value <= 100 ? 100 : height.value;
    containerRef.value.style.transition =
      'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    await sleep(400);
    containerRef.value.style.transition = '';
  },
});
useSwipe(containerRef, (dir) => {
  console.log('滑动了', dir);
});
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .demo {
    position: relative;
    overflow: hidden;
    width: 200px;
    background-color: aqua;
    border-radius: 8px;

    .trigger {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 32px;
      background-color: blueviolet;
    }
  }
}
</style>
