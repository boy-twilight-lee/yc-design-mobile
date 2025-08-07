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
      <!-- overlay -->
      <yc-overlay
        v-if="overlay"
        v-model:visible="innerVisible"
        :z-index="0"
        :overlay-class="overlayClass"
        :overlay-style="{
          position: 'absolute',
          ...overlayStyle,
        }"
        @overlay-click="
          (ev) => {
            $emit('overlay-click', ev);
            handleClose('overlay', ev, false);
          }
        "
      />
      <!-- popup -->
      <transition
        :name="`slide-popup-${placement}`"
        @before-enter="$emit('before-open')"
        @before-leave="$emit('before-close')"
        @after-enter="$emit('open')"
        @after-leave="handleAfterLeave"
      >
        <slot name="popup" :visible="innerVisible">
          <div
            v-show="innerVisible"
            :class="['yc-popup', popupClass]"
            :style="{
              height: ['left', 'right'].includes(placement)
                ? '100%'
                : valueToPx(height),
              width: ['left', 'right'].includes(placement)
                ? valueToPx(width)
                : `100%`,
              ...popupStyle,
            }"
          >
            <slot />
          </div>
        </slot>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { PopupProps, PopupEmits, PopupSlots } from './type';
import { valueToPx, isUndefined } from '@shared/utils';
import usePopupClose from '@/components/Dialog/hooks/useDialogClose';
import YcOverlay from '@/components/Overlay';
defineOptions({
  name: 'Popup',
  inheritAttrs: false,
});
defineSlots<PopupSlots>();
const props = withDefaults(defineProps<PopupProps>(), {
  visible: undefined,
  defaultVisible: false,
  placement: 'bottom',
  overlay: true,
  overlayClass: '',
  overlayStyle: () => ({}),
  overlayClosable: true,
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
const { visible, defaultVisible, placement, overlayClosable, lockScroll } =
  toRefs(props);
// 处理组件关闭开启
const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
  usePopupClose({
    visible,
    defaultVisible,
    overlayClosable,
    lockScroll,
    emits,
  });
</script>

<style lang="less" scoped>
@import './style/popup.less';
</style>
