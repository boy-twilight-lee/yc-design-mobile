<template>
  <teleport :to="popupContainer || 'body'">
    <div
      v-if="!unmountOnClose || outerVisible"
      v-show="outerVisible"
      :class="['yc-modal-container', $attrs.class]"
      :style="{
        position: isUndefined(popupContainer) ? 'fixed' : 'absolute',
        zIndex,
        ...($attrs.style ?? {}),
      }"
    >
      <yc-mask
        v-if="mask"
        v-model:visible="innerVisible"
        :z-index="0"
        :mask-class="['yc-modal-mask', maskClass as unknown as string]"
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
              {
                'yc-modal-has-title': title || $slots.header,
              },
            ]"
            :style="{
              width: valueToPx(width),
              ...modalStyle,
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
                <yc-button
                  v-if="!hideCancel"
                  type="text"
                  class="yc-modal-cancel-button"
                  v-bind="cancelButtonProps"
                  @click="handleClose('cancelBtn', $event)"
                >
                  {{ cancelText }}
                </yc-button>
                <yc-button
                  v-if="!hideOk"
                  type="text"
                  class="yc-modal-ok-button"
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
import { ModalProps, ModalEmits, ModalSlots } from './type';
import { valueToPx, isUndefined } from '@shared/utils';
import useModalClose from './hooks/useModalClose';
import YcMask from '../Mask';
import YcButton from '../Button';
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
  okButtonProps: () => ({}),
  cancelButtonProps: () => ({}),
  zIndex: 1001,
  popupContainer: undefined,
  lockScroll: true,
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
  lockScroll,
  modalStyle: _modalStyle,
} = toRefs(props);
const { onBeforeOk, onBeforeCancel } = props;
// 处理组件关闭开启
const {
  outerVisible,
  innerVisible,
  asyncLoading,
  handleClose,
  handleAfterLeave,
} = useModalClose({
  visible,
  defaultVisible,
  maskClosable,
  lockScroll,
  onBeforeOk,
  onBeforeCancel,
  emits,
});
</script>

<style lang="less" scoped>
@import './style/modal.less';
</style>
