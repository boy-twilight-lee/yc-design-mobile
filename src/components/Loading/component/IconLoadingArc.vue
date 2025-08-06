<template>
  <div class="icon-loading-arc"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { valueToPx } from '@shared/utils';
const props = withDefaults(
  defineProps<{
    size?: number | string;
    stroke?: number | string;
    strokeColor?: string;
  }>(),
  {
    size: 20,
    stroke: 2,
    strokeColor: '#165dff',
  }
);
// size
const size = computed(() => valueToPx(props.size));
// stroke
const stroke = computed(() => {
  return `${valueToPx(props.stroke)} solid #e5e6eb`;
});
// arc
const arc = computed(() => {
  return `${valueToPx(props.stroke)} solid ${props.strokeColor}`;
});
</script>

<style lang="less" scoped>
.icon-loading-arc {
  width: v-bind(size);
  height: v-bind(size);
  border: v-bind(stroke);
  border-top: v-bind(arc);
  border-radius: 50%;
}
</style>
