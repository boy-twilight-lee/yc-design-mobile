<template>
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    stroke-width="4"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    :class="[
      'yc-icon',
      {
        'yc-icon-spin': spin,
      },
    ]"
  >
    <slot></slot>
  </svg>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { valueToPx } from '@shared/utils';
type IconProps = {
  rotate?: number;
  spin?: boolean;
  size?: number | number[];
  color?: string;
};
const props = withDefaults(defineProps<IconProps>(), {
  spin: false,
});
const { size, spin, rotate, color: _color } = toRefs(props);
// width
const width = computed(() => {
  return Array.isArray(size.value)
    ? valueToPx(size.value[0])
    : (valueToPx(size.value) ?? '1em');
});
// height
const height = computed(() => {
  return Array.isArray(size.value)
    ? valueToPx(size.value[0])
    : (valueToPx(size.value) ?? '1em');
});
// color
const color = computed(() => {
  return _color.value ? _color.value : 'inherit';
});
// transform
const transform = computed(() => {
  return rotate.value ? `rotate(${rotate.value}deg)` : 'unset';
});
</script>

<style lang="less" scoped>
.yc-icon {
  display: inline-block;
  overflow: hidden;
  width: v-bind(width);
  height: v-bind(height);
  color: v-bind(color);
  transform: v-bind(transform);
  &.yc-icon-spin {
    animation: spin 1s infinite cubic-bezier(0, 0, 1, 1);
  }
}
// 旋转
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
