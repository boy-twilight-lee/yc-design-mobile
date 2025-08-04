<template>
  <div class="container">
    <yc-button
      type="primary"
      @click="
        $modal.open({
          content: '确认删除嘛',
          onBeforeOk: handleOk,
        })
      "
      >测试</yc-button
    >
    <yc-popup v-model:visible="visible" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const visible = ref<boolean>(false);
const handleOk = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 10000000);
  });
};
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
