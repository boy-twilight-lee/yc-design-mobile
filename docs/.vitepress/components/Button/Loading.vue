<template>
  <Button type="primary" loading>加载中</Button>
  <Button type="primary" :loading="loading" @click="handleClick">
    {{ loading ? '加载中' : '点击加载' }}
  </Button>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@varco/core'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.varco-button {
  margin-right: 10px;
}
</style>