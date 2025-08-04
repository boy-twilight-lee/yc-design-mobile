<template>
  <div class="container">
    <button @click="visible = true">测试</button>
    <yc-modal v-model:visible="visible" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const visible = ref<boolean>(false);
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
