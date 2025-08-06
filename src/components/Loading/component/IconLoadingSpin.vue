<template>
  <div class="icon-loading-spin">
    <span
      v-for="item in cells"
      :key="item.id"
      :style="item.style"
      class="spin-cell"
    >
      <span
        class="spin-cell-inner"
        :style="{ borderRadius: dotBorderRadius }"
      ></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { valueToPx } from '@shared/utils';

const props = withDefaults(
  defineProps<{
    size?: number | string;
    strokeCount?: number;
    stroke?: number | string;
    strokeColor?: string;
  }>(),
  {
    size: 20,
    strokeCount: 8,
    stroke: 2,
    strokeColor: '#165dff',
  }
);
// size
const size = computed(() => valueToPx(props.size));
// dot-width
const dotWidth = computed(() => valueToPx(props.stroke));
// dot-height
const dotHeight = computed(() =>
  valueToPx(parseFloat(props.size.toString()) * 0.25)
);
// radius
const dotBorderRadius = computed(() => valueToPx(props.stroke));
// transform
const transformOrigin = computed(
  () => `center ${parseFloat(props.size.toString()) / 2}px`
);
// 动态计算每个线条的样式
const cells = computed(() => {
  const cellList = [];
  const angle = 360 / props.strokeCount;
  for (let i = 0; i < props.strokeCount; i++) {
    cellList.push({
      id: i,
      style: {
        transform: `rotate(${angle * i}deg)`,
        opacity: 1 - (i / props.strokeCount) * 0.9,
      },
    });
  }
  return cellList;
});
</script>

<style lang="less" scoped>
.icon-loading-spin {
  position: relative;
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);

  .spin-cell {
    position: absolute;
    top: 0;
    left: 50%;
    width: v-bind(dotWidth);
    height: v-bind(dotHeight);
    transform-origin: v-bind(transformOrigin);
    margin-left: calc(v-bind(dotWidth) / -2);

    .spin-cell-inner {
      display: block;
      width: 100%;
      height: 100%;
      background-color: v-bind(strokeColor); /* 动态设置颜色 */
    }
  }
}
</style>
