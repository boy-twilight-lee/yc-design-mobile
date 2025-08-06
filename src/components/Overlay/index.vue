<template>
  <transition :name="overlayAnimationName">
    <div
      v-if="!unmountOnClose || computedVisible"
      v-show="computedVisible"
      :class="['yc-overlay', overlayClass]"
      :style="{
        zIndex,
        ...overlayStyle,
      }"
      @click.self="$emit('overlay-click', $event)"
    >
      <slot />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useControlValue } from '@shared/utils';
import { OverlayProps, OverlayEmits, OverlaySlots } from './type';
defineOptions({
  name: 'Overlay',
});
defineSlots<OverlaySlots>();
const props = withDefaults(defineProps<OverlayProps>(), {
  visible: undefined,
  defaultVisible: false,
  zIndex: 1001,
  overlayClass: '',
  overlayStyle: () => ({}),
  overlayAnimationName: 'fade',
  unmountOnClose: false,
});
const emits = defineEmits<OverlayEmits>();
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
@import './style/overlay.less';
</style>
