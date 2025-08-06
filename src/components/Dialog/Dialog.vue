<template>
  <teleport :to="popupContainer || 'body'">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      :class="['yc-dialog-container', $attrs.class]"
      :style="{
        position: isUndefined(popupContainer) ? 'fixed' : 'absolute',
        zIndex,
        ...($attrs.style ?? {}),
      }"
    >
      <!-- overlay -->
      <yc-overlay
        v-if="overlay"
        v-model:visible="innerVisible"
        :z-index="0"
        :overlay-class="['yc-dialog-overlay', overlayClass as string]"
        :overlay-style="{
          position: 'absolute',
          ...overlayStyle,
        }"
        :overlay-animation-name="overlayAnimationName"
      />
      <!-- dialog -->
      <transition
        :name="dialogAnimationName"
        @before-enter="$emit('before-open')"
        @before-leave="$emit('before-close')"
        @after-enter="$emit('open')"
        @after-leave="handleAfterLeave"
      >
        <div
          v-show="innerVisible"
          class="yc-dialog-wrapper"
          @click.self="handleClose('overlay', $event)"
        >
          <div
            :class="[
              'yc-dialog',
              dialogClass,
              {
                'yc-dialog-has-title': title || $slots.header,
              },
            ]"
            :style="{
              width: valueToPx(width),
              ...dialogStyle,
            }"
          >
            <!-- header -->
            <slot v-if="title || $slots.header" name="header">
              <div class="yc-dialog-header">
                <span class="text-ellipsis">
                  {{ title }}
                </span>
              </div>
            </slot>
            <!-- body -->
            <div class="yc-dialog-body" :class="bodyClass" :style="bodyStyle">
              <slot />
            </div>
            <!-- footer -->
            <slot v-if="$slots.footer || footer" name="footer">
              <div class="yc-dialog-footer">
                <yc-button
                  v-if="!hideCancel"
                  type="text"
                  class="yc-dialog-cancel-button"
                  v-bind="cancelButtonProps"
                  @click="handleClose('cancelBtn', $event)"
                >
                  {{ cancelText }}
                </yc-button>
                <yc-button
                  type="text"
                  class="yc-dialog-ok-button"
                  :loading="asyncLoading"
                  v-bind-="okButtonProps"
                  @click="handleClose('confirmBtn', $event)"
                >
                  {{ okText }}
                </yc-button>
              </div>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { DialogProps, DialogEmits, DialogSlots } from './type';
import { valueToPx, isUndefined } from '@shared/utils';
import useDialogClose from './hooks/useDialogClose';
import YcOverlay from '../Overlay';
import YcButton from '../Button';
defineOptions({
  name: 'Dialog',
  inheritAttrs: false,
});
defineSlots<DialogSlots>();
const props = withDefaults(defineProps<DialogProps>(), {
  visible: undefined,
  defaultVisible: false,
  width: 310,
  overlay: true,
  title: '',
  unmountOnClose: false,
  overlayClosable: true,
  footer: true,
  hideCancel: false,
  okText: '确定',
  cancelText: '取消',
  okButtonProps: () => ({}),
  cancelButtonProps: () => ({}),
  zIndex: 1001,
  popupContainer: undefined,
  lockScroll: true,
  dialogClass: '',
  dialogStyle: () => ({}),
  dialogAnimationName: 'zoom-modal',
  overlayClass: '',
  overlayStyle: () => ({}),
  overlayAnimationName: 'fade',
  bodyClass: '',
  bodyStyle: () => ({}),
  onBeforeCancel: () => true,
  onBeforeOk: () => true,
});
const emits = defineEmits<DialogEmits>();
const {
  visible,
  defaultVisible,
  width,
  overlayClosable,
  lockScroll,
  dialogStyle: _dialogStyle,
} = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
// 处理组件关闭开启
const {
  outerVisible,
  innerVisible,
  asyncLoading,
  handleClose,
  handleAfterLeave,
} = useDialogClose({
  visible,
  defaultVisible,
  overlayClosable,
  lockScroll,
  onBeforeOk,
  onBeforeCancel,
  emits,
});
</script>

<style lang="less" scoped>
@import './style/dialog.less';
</style>
