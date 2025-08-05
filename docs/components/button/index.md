# Button 按钮

## 简介

Button 按钮是触发操作的基本元素，用于开启一个即时操作。

## 基础用法

使用 `type`、`plain`、`round` 属性来定义 Button 的样式。

<Basic />

::: details 查看代码
<<< @/.vitepress/components/Button/Basic.vue
:::

## 禁用状态

使用 `disabled` 属性来定义按钮是否被禁用。

<Disabled />

::: details 查看代码
<<< @/.vitepress/components/Button/Disabled.vue
:::

## 不同尺寸

使用 `size` 属性来定义按钮的尺寸。

<Sizes />

::: details 查看代码
<<< @/.vitepress/components/Button/Sizes.vue
:::

## 加载状态

使用 `loading` 属性来定义按钮是否处于加载状态。

<Loading />

::: details 查看代码
<<< @/.vitepress/components/Button/Loading.vue
:::

<script setup>
import Basic from "../../.vitepress/components/Button/Basic.vue"
import Disabled from "../../.vitepress/components/Button/Disabled.vue"
import Sizes from "../../.vitepress/components/Button/Sizes.vue"
import Loading from "../../.vitepress/components/Button/Loading.vue"
</script>
