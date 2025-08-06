<template>
  <div class="container">
    <yc-button @click="visible = true">测试</yc-button>
    <yc-floating-popup v-model:visible="visible" :anchors="[0.3, 0.7]">
      <div style="max-height: 200px; overflow: auto; touch-action: pan-y">
        <div
          v-for="i in 1000"
          :key="i"
          style="line-height: 20px; font-size: 14px; text-align: center"
        >
          {{ i }}
        </div>
      </div>
    </yc-floating-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const visible = ref<boolean>(true);
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
