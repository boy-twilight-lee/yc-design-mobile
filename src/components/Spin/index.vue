<template>
  <div class="yc-spin">
    <div :class="['yc-spin-icon']">
      <slot name="icon">
        <icon-loading :size="isSizeInherit ? undefined : size" />
      </slot>
    </div>
    <div v-if="tip" class="yc-spin-tip">
      <slot name="tip">
        {{ tip }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SpinProps, SpinSlots } from './type';
import { IconLoading } from '@shared/icons';
defineOptions({
  name: 'Spin',
});
defineSlots<SpinSlots>();
withDefaults(defineProps<SpinProps>(), {
  size: 20,
  loading: false,
  tip: '',
  hideIcon: false,
  isSizeInherit: false,
});
</script>

<style lang="less" scoped>
@import './style/spin.less';
</style>
