<template>
  <div class="yc-loading">
    <div :class="['yc-loading-icon']">
      <slot name="icon">
        <icon-loading :size="isSizeInherit ? undefined : size" />
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
import { IconLoading } from '@shared/icons';
defineOptions({
  name: 'Loading',
});
defineSlots<LoadingSlots>();
withDefaults(defineProps<LoadingProps>(), {
  size: 20,
  loading: false,
  tip: '',
  hideIcon: false,
  isSizeInherit: false,
});
</script>

<style lang="less" scoped>
@import './style/loading.less';
</style>
