<template>
  <div class="container">
    <yc-button>测试</yc-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
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
