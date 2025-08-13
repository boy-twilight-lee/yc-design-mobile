<template>
  <div class="container">
    <yc-picker :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const loading = ref(false);
const columns = ref(
  new Array(6).fill(undefined).map((_v, i) => {
    return {
      text: i,
      value: i,
    };
  })
);
</script>

<style lang="less" scoped>
.container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 8px;
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
