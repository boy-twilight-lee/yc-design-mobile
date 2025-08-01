<template>
  <div class="container"></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>
