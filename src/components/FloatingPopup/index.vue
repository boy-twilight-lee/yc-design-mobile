<template>
  <yc-popup
    v-bind="props"
    v-model:visible="computedVisible"
    :class="$attrs.class"
    :style="$attrs.style"
    @click-mask="(e) => $emit('click-mask', e)"
    @open="$emit('open')"
    @close="$emit('close')"
    @before-open="$emit('before-open')"
    @before-close="$emit('before-close')"
  >
    <template #popup="{ visible }">
      <div
        v-show="visible"
        :class="[
          'yc-floating-popup',
          popupClass as string,
          {
            'yc-floating-popup-round': round,
          },
        ]"
        :style="{
          inset,
          ...popupStyle,
        }"
        ref="containerRef"
      >
        <div class="yc-floating-popup-header" ref="headerRef">
          <!--  header-left -->
          <div
            v-if="$slots['header-left']"
            class="yc-floating-popup-header-left"
          >
            <slot name="header-left" />
          </div>
          <!-- title -->
          <div class="yc-floating-popup-header-title">
            <slot name="title">
              <template v-if="title">
                {{ title }}
              </template>
              <span class="yc-floating-popup-header-bar"></span>
            </slot>
          </div>
          <!-- header-right -->
          <div
            v-if="$slots['header-right'] || closeable"
            class="yc-floating-popup-header-right"
            @click="computedVisible = false"
          >
            <slot name="header-right">
              <icon-close />
            </slot>
          </div>
        </div>
        <!-- body -->
        <div class="yc-floating-popup-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="yc-floating-popup-footer">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </yc-popup>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch } from 'vue';
import {
  FloatingPopupProps,
  FloatingPopupEmits,
  FloatingPopupSlots,
} from './type';
import { useControlValue, sleep, useTouch, valueToPx } from '@shared/utils';
import { IconClose } from '@shared/icons';
import YcPopup from '@/components/Popup';
defineOptions({
  name: 'FloatingPopup',
  inheritAttrs: false,
});
defineSlots<FloatingPopupSlots>();
const props = withDefaults(defineProps<FloatingPopupProps>(), {
  visible: undefined,
  defaultVisible: false,
  mask: true,
  maskClass: '',
  maskStyle: () => ({}),
  maskClosable: true,
  popupClass: '',
  popupStyle: () => ({}),
  round: true,
  zIndex: 1001,
  lockScroll: true,
  unmountOnClose: false,
  popupContainer: undefined,
  title: '',
  closeable: true,
  fixedHeight: false,
  anchors: () => [0.6, 0.9],
  durations: 200,
  contentDraggable: true,
});
const emits = defineEmits<FloatingPopupEmits>();
// visible
const {
  visible,
  defaultVisible,
  contentDraggable,
  durations,
  fixedHeight,
  anchors,
} = toRefs(props);
// 计算的visible
const computedVisible = useControlValue<boolean>(
  visible,
  defaultVisible.value,
  (val) => {
    emits('update:visible', val);
  }
);
// containerRef
const containerRef = ref<HTMLDivElement>();
// headerRef
const headerRef = ref<HTMLDivElement>();
// triggerRef
const triggerRef = computed(() =>
  contentDraggable.value ? containerRef.value : headerRef.value
);
// 最小高度
const minHeight = computed(() => {
  return anchors.value[0] <= 1
    ? anchors.value[0] * window.innerHeight
    : anchors.value[0];
});
// 最大高度
const maxHeight = computed(() => {
  return anchors.value[1] <= 1
    ? anchors.value[1] * window.innerHeight
    : anchors.value[1];
});
// dawerHeight
const height = ref<number>(0);
// inset
const inset = computed(() => {
  return `${valueToPx(window.innerHeight - height.value)} 0 0 0`;
});
// 处理拖动
useTouch(triggerRef, {
  onStart() {
    containerRef.value!.style.transition = 'none';
  },
  onMove({ y }) {
    height.value -= y;
    emits('position-change', height.value);
  },
  onEnd: async () => {
    const style = containerRef.value!.style;
    if (height.value < minHeight.value) {
      computedVisible.value = false;
    }
    if (height.value > maxHeight.value || fixedHeight.value) {
      height.value = fixedHeight.value ? minHeight.value : maxHeight.value;
      style.transition = `top ${durations.value / 1000}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
      await sleep(durations.value);
    }
    style.transition = '';
  },
});
// 检测
watch(
  () => computedVisible.value,
  () => {
    height.value = minHeight.value;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less">
@import './style/floating-popup.less';
</style>
