<template>
  <div class="container">
    <yc-button @click="visible = true">测试</yc-button>
    <yc-floating-popup v-model:visible="visible"> </yc-floating-popup>
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
