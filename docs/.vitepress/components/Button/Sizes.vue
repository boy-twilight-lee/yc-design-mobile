<template>
  <div class="example-button">
    <Button size="large">大型按钮</Button>
    <Button>默认按钮</Button>
    <Button size="small">小型按钮</Button>
  </div>
  
  <div class="example-button">
    <Button size="large" round>大型按钮</Button>
    <Button round>默认按钮</Button>
    <Button size="small" round>小型按钮</Button>
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