<template>
  <yc-popup
    v-bind="props"
    v-model:visible="computedVisible"
    :popup-class="['yc-floating-popup', popupClass as string]"
    :class="$attrs.class"
    :style="$attrs.style"
    height="fit-content"
    @open="$emit('open')"
    @close="handleClose"
    @before-open="$emit('before-open')"
    @before-close="$emit('before-close')"
  >
    <div
      class="yc-floating-popup-container"
      :style="{
        height: valueToPx(drawerHeight <= 0 ? height : drawerHeight),
      }"
      ref="containerRef"
    >
      <div class="yc-floating-popup-header" ref="headerRef">
        <div
          v-if="$slots['header-left'] || headerLeftText"
          class="yc-floating-popup-header-left"
        >
          <slot name="header-left">
            {{ headerLeftText }}
          </slot>
        </div>
        <div class="yc-floating-popup-header-title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
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
      <div class="yc-floating-popup-body">
        <slot />
      </div>
    </div>
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
  height: '60vh',
  popupContainer: undefined,
  title: '',
  headerLeftText: '',
  closeable: true,
  fixedHeight: false,
  durations: 200,
  contentDraggable: true,
});
const emits = defineEmits<FloatingPopupEmits>();
// visible
const { visible, defaultVisible, contentDraggable, durations } = toRefs(props);
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
// dawerHeight
const drawerHeight = ref<number>(-1);
// 最小最大搞
let minHeight = 0;
let maxHeight = 0;
// 处理拖动
useTouch(triggerRef, {
  onStart() {
    if (!containerRef.value) return;
    containerRef.value!.style.transition = 'none';
  },
  onMove({ y }) {
    if (!containerRef.value) return;
    const { bottom } = containerRef.value!.getBoundingClientRect();
    drawerHeight.value = bottom - y;
  },
  onEnd: async () => {
    if (!containerRef.value) return;
    if (drawerHeight.value > maxHeight) {
      drawerHeight.value = maxHeight;
      containerRef.value.style.transition = `height ${durations.value / 1000}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
      await sleep(durations.value);
      containerRef.value.style.transition = '';
    } else if (drawerHeight.value < minHeight) {
      computedVisible.value = false;
    }
  },
});
//
const handleClose = () => {
  drawerHeight.value = -1;
  emits('close');
};
// 检测
watch(
  () => computedVisible.value,
  async (val) => {
    if (!val) return;
    await sleep(0);
    drawerHeight.value = containerRef.value!.offsetHeight;
    const max = document.createElement('div');
    const min = document.createElement('div');
    max.style.cssText =
      'width:100vw;height:90vh;position:absolute;top:0;left:0;z-index:-1;opacity:0';
    min.style.cssText =
      'width:100vw;height:60vh;position:absolute;top:0;left:0;z-index:-1;opacity:0';
    document.body.appendChild(max);
    document.body.appendChild(min);
    minHeight = min.offsetHeight;
    maxHeight = max.offsetHeight;
    document.body.removeChild(min);
    document.body.removeChild(max);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less">
.yc-floating-popup-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .yc-floating-popup-header {
    position: relative;
    flex-shrink: 0;
    height: 48px;
    display: flex;
    align-items: center;
    .yc-floating-popup-header-left,
    .yc-floating-popup-header-right {
      z-index: 1;
      position: absolute;
      height: 100%;
      padding: 0 16px;
      display: flex;
      align-items: center;

      &.yc-floating-popup-header-left {
        left: 0;
        font-size: 14px;
        color: #969799;
      }
      &.yc-floating-popup-header-right {
        right: 0;
        font-size: 22px;
        color: #969799;
      }
    }
    .yc-floating-popup-header-title {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: rgb(29, 33, 41);
    }
  }
  .yc-floating-popup-body {
    flex: 1;
  }
}
</style>
