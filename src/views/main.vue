<template>
  <div class="container">
    <yc-button>测试</yc-button>
    <yc-loading type="spin" />
    <yc-floating-popup v-model:visible="visible" :anchors="[0.3, 0.7]">
    </yc-floating-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref<boolean>(false);
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
