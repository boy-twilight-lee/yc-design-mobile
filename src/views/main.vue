<template>
  <div class="container">
    <yc-button
      @click="
        $message.open({
          content: 'dsadadsadadsadadsadadsadadsadadsadadsadadsadadsada',
          position: 'top',
        })
      "
      >测试</yc-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref<boolean>(false);
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
