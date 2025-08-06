<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import VConsole from 'vconsole';

onMounted(() => {
  new VConsole();
});
</script>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
