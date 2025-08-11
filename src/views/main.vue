<template>
  <div class="container">
    <yc-pull-refresh
      :loading="loading"
      style="height: 100%; overflow: auto"
      @refresh="handleLoad"
    >
      <div
        v-for="i in 500"
        :key="i"
        style="line-height: 20px; text-align: center"
      >
        {{ i }}
      </div>
    </yc-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const loading = ref(false);
const handleLoad = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
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
