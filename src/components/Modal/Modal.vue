<template>
  <teleport :to="popupContainer || 'body'">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      class="yc-modal-container"
      :style="{
        position: isUndefined(popupContainer) ? 'fixed' : 'absolute',
        zIndex,
      }"
    >
      <yc-mask
        v-if="mask"
        v-model:visible="innerVisible"
        :mask-class="maskClass"
        :z-index="0"
        :mask-style="{
          position: 'absolute',
          ...maskStyle,
        }"
        :mask-animation-name="maskAnimationName"
      />
      <!-- modal -->
      <transition
        :name="modalAnimationName"
        @before-enter="$emit('before-open')"
        @before-leave="$emit('before-close')"
        @after-enter="$emit('open')"
        @after-leave="handleAfterLeave"
      >
        <div
          v-show="innerVisible"
          class="yc-modal-wrapper"
          @click.self="handleClose('mask', $event)"
        >
          <div
            :class="[
              'yc-modal',
              modalClass,
              $attrs.class,
              {
                'yc-modal-has-title': title || $slots.header,
              },
            ]"
            :style="{
              width: valueToPx(width),
              ...modalStyle,
              ...($attrs.style ?? {}),
            }"
          >
            <!-- header -->
            <slot v-if="title || $slots.header" name="header">
              <div class="yc-modal-header">
                <span class="text-ellipsis">
                  {{ title }}
                </span>
              </div>
            </slot>
            <!-- body -->
            <div class="yc-modal-body" :class="bodyClass" :style="bodyStyle">
              <slot />
            </div>
            <!-- footer -->
            <slot v-if="$slots.footer || !hideCancel || !hideOk" name="footer">
              <div class="yc-modal-footer">
                <button
                  v-if="!hideCancel"
                  :class="[
                    'yc-modal-cancel-button',
                    {
                      'yc-button-disabled': cancelButtonDisabled,
                    },
                  ]"
                  :disabled="cancelButtonDisabled"
                  @click="handleClose('cancel', $event)"
                >
                  {{ cancelText }}
                </button>
                <button
                  v-if="!hideOk"
                  :class="[
                    'yc-modal-ok-button',
                    {
                      'yc-button-disabled': okButtonDisabled,
                    },
                  ]"
                  :disabled="okButtonDisabled"
                  @click="handleClose('ok', $event)"
                >
                  {{ okText }}
                </button>
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
import { ModalProps, ModalEmits, ModalSlots } from './type';
import { valueToPx, isUndefined } from '@shared/utils';
import useModalClose from './hooks/useModalClose';
import YcMask from '../Mask';
defineOptions({
  name: 'Modal',
  inheritAttrs: false,
});
defineSlots<ModalSlots>();
const props = withDefaults(defineProps<ModalProps>(), {
  visible: undefined,
  defaultVisible: false,
  width: 310,
  mask: true,
  title: '',
  unmountOnClose: false,
  maskClosable: true,
  hideCancel: false,
  hideOk: false,
  okText: '确定',
  cancelText: '取消',
  okButtonDisabled: false,
  cancelButtonDisabled: false,
  zIndex: 1001,
  popupContainer: undefined,
  maskClass: '',
  maskStyle: () => ({}),
  modalClass: '',
  modalStyle: () => ({}),
  maskAnimationName: 'fade',
  modalAnimationName: 'zoom-modal',
  bodyClass: '',
  bodyStyle: () => ({}),
  onBeforeCancel: () => true,
  onBeforeOk: () => true,
});
const emits = defineEmits<ModalEmits>();
const {
  visible,
  defaultVisible,
  width,
  maskClosable,
  modalStyle: _modalStyle,
} = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
// 处理组件关闭开启
const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
  useModalClose({
    visible,
    defaultVisible,
    maskClosable,
    onBeforeOk,
    onBeforeCancel,
    emits,
  });
</script>

<style lang="less" scoped>
@import './style/modal.less';
</style>
