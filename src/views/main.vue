<template>
  <div class="container">
    <button
      @click="
        $modal.open({
          title: '标题',
          content:
            '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
        })
      "
    >
      测试
    </button>
    <yc-modal v-model:visible="visible" ok-button-disabled />
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
