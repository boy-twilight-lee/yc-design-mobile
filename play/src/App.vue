<script lang="ts">
import { Button } from "@varco/core";

export default {
  components: {
    Button,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleClick(event: any) {
      console.log("按钮被点击了:", event);
    },

    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>

<template>
  <div class="container">
    <h1>Varco Button 组件演示</h1>

    <div class="demo-section">
      <h2>基础按钮</h2>
      <div class="button-group">
        <Button @click="handleClick">默认按钮</Button>
        <Button type="primary" @click="handleClick">主要按钮</Button>
        <Button type="success" @click="handleClick">成功按钮</Button>
        <Button type="warning" @click="handleClick">警告按钮</Button>
        <Button type="danger" @click="handleClick">危险按钮</Button>
      </div>
    </div>

    <div class="demo-section">
      <h2>朴素按钮</h2>
      <div class="button-group">
        <Button plain @click="handleClick">朴素按钮</Button>
        <Button type="primary" plain @click="handleClick">主要按钮</Button>
        <Button type="success" plain @click="handleClick">成功按钮</Button>
        <Button type="warning" plain @click="handleClick">警告按钮</Button>
        <Button type="danger" plain @click="handleClick">危险按钮</Button>
      </div>
    </div>

    <div class="demo-section">
      <h2>不同尺寸</h2>
      <div class="button-group">
        <Button size="large" @click="handleClick">大型按钮</Button>
        <Button size="medium" @click="handleClick">中等按钮</Button>
        <Button size="small" @click="handleClick">小型按钮</Button>
      </div>
    </div>

    <div class="demo-section">
      <h2>特殊状态</h2>
      <div class="button-group">
        <Button round @click="handleClick">圆角按钮</Button>
        <Button disabled @click="handleClick">禁用按钮</Button>
        <Button :loading="loading" @click="toggleLoading">
          {{ loading ? "取消加载" : "点击加载" }}
        </Button>
      </div>
    </div>

    <div class="demo-section">
      <h2>组合使用</h2>
      <div class="button-group">
        <Button type="primary" size="large" round @click="handleClick"
          >大型圆角主要按钮</Button
        >
        <Button type="warning" plain round @click="handleClick"
          >朴素圆角警告按钮</Button
        >
        <Button type="danger" disabled @click="handleClick"
          >禁用危险按钮</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-section h2 {
  color: #333;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.button-group .varco-button {
  margin-right: 10px;
}
</style>
