# 开始使用

## 安装

### 使用 npm 安装

```bash
npm install @varco/core
```

### 使用 yarn 安装

```bash
yarn add @varco/core
```

### 使用 pnpm 安装

```bash
pnpm add @varco/core
```

## 快速开始

### 完整引入

```ts
import { createApp } from 'vue'
import Varco from '@varco/core'
import '@varco/core/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(Varco)
app.mount('#app')
```

### 按需引入

```ts
import { createApp } from 'vue'
import { Button } from '@varco/core'
import '@varco/core/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.component(Button.name, Button)
app.mount('#app')
```

### 手动按需引入（推荐）

```vue
<template>
  <Button type="primary">按钮</Button>
</template>

<script setup>
import { Button } from '@varco/core'
import '@varco/core/dist/index.css'
</script>
```