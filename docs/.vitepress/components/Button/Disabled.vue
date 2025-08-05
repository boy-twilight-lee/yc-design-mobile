<template>
  <div class="example-button">
    <Button disabled>默认按钮</Button>
    <Button type="primary" disabled>主要按钮</Button>
    <Button type="success" disabled>成功按钮</Button>
    <Button type="warning" disabled>警告按钮</Button>
    <Button type="danger" disabled>危险按钮</Button>
  </div>
  
  <div class="example-button">
    <Button plain disabled>朴素按钮</Button>
    <Button type="primary" plain disabled>主要按钮</Button>
    <Button type="success" plain disabled>成功按钮</Button>
    <Button type="warning" plain disabled>警告按钮</Button>
    <Button type="danger" plain disabled>危险按钮</Button>
  </div>
</template>

<script setup>
import { Button } from '@varco/core'
</script>

<style scoped>
.example-button {
  margin-bottom: 10px;
}

.example-button .varco-button {
  margin-right: 10px;
}
</style>