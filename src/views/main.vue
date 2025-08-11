<template>
  <div class="container">
    <yc-stepper />
    <van-stepper size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
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
  gap: 10px;

  .van-pull-refresh,
  .yc-pull-refresh {
    height: 300px;
    width: 300px;
    overflow: auto;
    border: 1px solid rgb(229, 230, 235);
    border-radius: 8px;
  }
}
</style>
