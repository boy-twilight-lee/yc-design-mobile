<template>
  <div class="icon-loading-circle"></div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
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
const { strokeColor } = toRefs(props);
// size
const size = computed(() => valueToPx(props.size));
// maskInnerStop
const maskInnerStop = computed(() => {
  const numericSize = parseFloat(props.size.toString());
  const numericStroke = parseFloat(props.stroke.toString());
  const strokePercentOfRadius = (numericStroke * 200) / numericSize;
  return `${100 - strokePercentOfRadius}%`;
});
</script>

<style lang="less" scoped>
.icon-loading-circle {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 50%;
  background: conic-gradient(v-bind(strokeColor), transparent);
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent v-bind(maskInnerStop),
    #000 v-bind(maskInnerStop)
  );
  mask: radial-gradient(
    farthest-side,
    transparent v-bind(maskInnerStop),
    #000 v-bind(maskInnerStop)
  );
}
</style>
