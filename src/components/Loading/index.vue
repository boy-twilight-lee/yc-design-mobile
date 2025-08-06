<template>
  <div class="yc-loading">
    <div :class="['yc-loading-icon']">
      <slot name="icon">
        <component
          :is="getIcon()"
          :size="size"
          :stroke="stroke"
          :stroke-color="strokeColor"
          :stroke-count="strokeCount"
        />
      </slot>
    </div>
    <div v-if="tip" class="yc-loading-tip">
      <slot name="tip">
        {{ tip }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoadingProps, LoadingSlots } from './type';
import IconLoadingArc from './component/IconLoadingArc.vue';
import IconLoadingCircle from './component/IconLoadingCircle.vue';
import IconLoadingSpin from './component/IconLoadingSpin.vue';
defineOptions({
  name: 'Loading',
});
defineSlots<LoadingSlots>();
const props = withDefaults(defineProps<LoadingProps>(), {
  size: 20,
  type: 'circle',
  stroke: 2,
  strokeColor: '#165dff',
  strokeCount: 8,
  tip: '',
});
// 获取icon
const getIcon = () => {
  const map = {
    arc: IconLoadingArc,
    circle: IconLoadingCircle,
    spin: IconLoadingSpin,
  };
  return map[props.type] || IconLoadingCircle;
};
</script>

<style lang="less" scoped>
@import './style/loading.less';
</style>
