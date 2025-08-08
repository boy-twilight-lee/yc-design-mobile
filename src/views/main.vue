<template>
  <div class="container">
    <yc-pull-refresh :loading="loading" @refresh="handleRefresh">
      <div style="width: 100%; height: 100%; background-color: black"></div>
    </yc-pull-refresh>
    <van-pull-refresh :model-value="loading" @refresh="handleRefresh">
      <div style="width: 100%; height: 100%; background-color: black"></div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { sleep } from '@shared/utils';
const loading = ref<boolean>(false);
const handleRefresh = async () => {
  loading.value = true;
  await sleep(1000);
  loading.value = false;
};
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
    border: 1px solid rgb(229, 230, 235);
    border-radius: 8px;
  }
}
</style>
