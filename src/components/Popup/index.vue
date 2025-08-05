<template>
  <teleport :to="popupContainer || 'body'">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      :class="[
        'yc-popup-container',
        `yc-popup-placement-${placement}`,
        $attrs.class,
        {
          'yc-popup-round': round,
        },
      ]"
      :style="{
        zIndex,
        position: isUndefined(popupContainer) ? 'fixed' : 'absolute',
        ...($attrs.style ?? {}),
      }"
    >
      <yc-mask
        v-if="mask"
        v-model:visible="innerVisible"
        :z-index="0"
        :mask-class="['yc-popup-mask', maskClass as string]"
        :mask-style="{
          position: 'absolute',
          ...maskStyle,
        }"
        @click="
          (ev) => {
            $emit('click-mask', ev);
            handleClose('mask', ev, false);
          }
        "
      />
      <!-- drawer -->
      <transition
        :name="`slide-drawer-${placement}`"
        @before-enter="$emit('before-open')"
        @before-leave="$emit('before-close')"
        @after-enter="$emit('open')"
        @after-leave="handleAfterLeave"
      >
        <slot name="popup" :visible="innerVisible">
          <div
            v-show="innerVisible"
            :class="['yc-popup', popupClass]"
            :style="popupStyle"
          >
            <slot />
          </div>
        </slot>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { PopupProps, PopupEmits, PopupSlots } from './type';
import { valueToPx, isUndefined } from '@shared/utils';
import usePopupClose from '@/components/Modal/hooks/useModalClose';
defineOptions({
  name: 'Popup',
  inheritAttrs: false,
});
defineSlots<PopupSlots>();
const props = withDefaults(defineProps<PopupProps>(), {
  visible: undefined,
  defaultVisible: false,
  placement: 'bottom',
  mask: true,
  maskClass: '',
  maskStyle: () => ({}),
  maskClosable: true,
  popupClass: '',
  popupStyle: () => ({}),
  round: (props) => {
    return ['top', 'bottom'].includes(props.placement || 'bottom');
  },
  zIndex: 1001,
  lockScroll: true,
  unmountOnClose: false,
  width: '50%',
  height: '50%',
  popupContainer: undefined,
});
const emits = defineEmits<PopupEmits>();
const {
  visible,
  defaultVisible,
  width,
  height,
  placement,
  maskClosable,
  lockScroll,
  popupStyle: _popupStyle,
} = toRefs(props);
// drawer绝对定位的left,top
const popupStyle = computed(() => {
  return {
    height:
      placement.value == 'left' || placement.value == 'right'
        ? '100%'
        : valueToPx(height.value),
    width:
      placement.value == 'left' || placement.value == 'right'
        ? valueToPx(width.value)
        : `100%`,
    // 传入样式
    ..._popupStyle.value,
  } as CSSProperties;
});
// 处理组件关闭开启
const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
  usePopupClose({
    visible,
    defaultVisible,
    maskClosable,
    lockScroll,
    emits: emits as any,
  });
</script>

<style lang="less" scoped>
@import './style/popup.less';
</style>
