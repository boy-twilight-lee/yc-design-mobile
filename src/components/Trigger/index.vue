<template>
  <component :is="vNode" ref="triggerRef" @click="handleClick" />
  <teleport :to="popupContainer">
    <transition
      :name="animationName"
      @after-leave="$emit('hide')"
      @after-enter="$emit('show')"
    >
      <!-- wrapper -->
      <div
        v-if="!unmountOnClose || (computedVisible && !disabled)"
        v-show="computedVisible && !disabled"
        :class="[
          'yc-trigger',
          `yc-trigger-position-${position}`,
          {
            'yc-trigger-transform-origin': needTransformOrigin,
          },
          $attrs.class,
        ]"
        :style="{
          ...popupStyle,
          ...($attrs.style || {}),
        }"
        ref="popupRef"
      >
        <!-- content -->
        <div
          :class="['yc-trigger-content', contentClass]"
          :style="contentStyle"
        >
          <slot name="content" />
        </div>
        <!-- arrow -->
        <div
          v-if="showArrow"
          :class="['yc-trigger-arrow', arrowClass]"
          :style="arrowStyle"
          ref="arrowRef"
        ></div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue';
import {
  TriggerProps,
  TriggerEmits,
  TriggerSlots,
  TriggerExpose,
} from './type';
import { findFirstLegitChild } from '@shared/utils';
import useTriggerVisible from './hooks/useTriggerVisible';
import useTriggerPosition from './hooks/useTriggerPosition';
defineOptions({
  name: 'Trigger',
  inheritAttrs: false,
});
defineSlots<TriggerSlots>();
const props = withDefaults(defineProps<TriggerProps>(), {
  popupVisible: undefined,
  defaultPopupVisible: false,
  trigger: 'click',
  position: 'bottom',
  disabled: false,
  popupOffset: 0,
  popupTranslate: () => [0, 0],
  showArrow: false,
  blurToClose: true,
  clickToClose: true,
  clickOutsideToClose: true,
  unmountOnClose: true,
  contentClass: '',
  contentStyle: () => {
    return {};
  },
  arrowClass: '',
  arrowStyle: () => {
    return {};
  },
  animationName: 'fade',
  focusDelay: 0,
  autoFitPopupWidth: false,
  autoFitPopupMinWidth: false,
  popupContainer: 'body',
  renderToBody: true,
  autoFitPosition: true,
  updateAtScroll: true,
  preventFocus: false,
  needTransformOrigin: false,
  autoSetPosition: false,
});
const emits = defineEmits<TriggerEmits>();
// 弹出层的ref
const popupRef = ref<HTMLDivElement>();
// trigger的ref
const triggerRef = ref<HTMLElement>();
// arrowRef
const arrowRef = ref<HTMLElement>();
// 获取插槽
const slots = useSlots();
// slots
const vNode = computed(() => {
  return findFirstLegitChild(slots.default?.() || []);
});
// 处理trigger关闭与开启
const { computedVisible, handleClick } = useTriggerVisible({
  props,
  emits,
  popupRef,
  triggerRef,
});
// 计算wrapper与arrow的位置信息
const { position, popupStyle, contentStyle, arrowStyle } = useTriggerPosition({
  props,
  computedVisible,
  popupRef,
  triggerRef,
  arrowRef,
});
defineExpose<TriggerExpose>({
  hide() {
    computedVisible.value = false;
  },
  show() {
    computedVisible.value = true;
  },
});
</script>

<style lang="less" scoped>
@import './style/trigger.less';
</style>
