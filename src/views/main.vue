<template>
  <div class="container">
    <yc-pull-refresh
      :loading="loading"
      @refresh="handleRefresh"
      style="height: 100%; overflow: auto"
    >
      <div
        v-for="i in 100"
        :key="i"
        style="
          line-height: 20px;
          color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        {{ i }}
      </div>
    </yc-pull-refresh>
    <van-pull-refresh
      :model-value="loading"
      @refresh="handleRefresh"
      style="overflow: auto; height: 400px"
    >
      <div
        v-for="i in 100"
        :key="i"
        style="
          line-height: 20px;
          color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        {{ i }}
      </div>
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
