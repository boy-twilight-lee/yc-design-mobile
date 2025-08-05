<template>
  <transition :name="maskAnimationName">
    <div
      v-if="!unmountOnClose || computedVisible"
      v-show="computedVisible"
      :class="['yc-mask', maskClass]"
      :style="{
        zIndex,
        ...maskStyle,
      }"
      @click.self="$emit('click', $event)"
    >
      <slot />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useControlValue } from '@shared/utils';
import { MaskProps, MaskEmits, MaskSlots } from './type';
defineOptions({
  name: 'Mask',
});
defineSlots<MaskSlots>();
const props = withDefaults(defineProps<MaskProps>(), {
  visible: undefined,
  defaultVisible: false,
  zIndex: 1001,
  maskClass: '',
  maskStyle: () => ({}),
  unmountOnClose: false,
  maskAnimationName: 'fade',
});
const emits = defineEmits<MaskEmits>();
const { visible, defaultVisible } = toRefs(props);
// computedVisible
const computedVisible = useControlValue<boolean>(
  visible,
  defaultVisible.value,
  (val) => {
    emits('update:visible', val);
  }
);
</script>

<style lang="less" scoped>
@import './style/mask.less';
</style>
