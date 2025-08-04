<template>
  <yc-modal
    v-bind="props"
    v-model:visible="visible"
    @ok="onOk?.()"
    @cancel="onCancel?.()"
    @before-open="onBeforeOpen?.()"
    @before-close="onBeforeClose?.()"
    @open="onOpen?.()"
    @close="handleClose"
  >
    <template #title>
      <component :is="getSlotFunction(title)" />
    </template>
    <div class="yc-modal-body-content text-ellipsis">
      <component :is="getSlotFunction(content)" />
    </div>
  </yc-modal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ModalServiceProps } from './type';
import { getSlotFunction } from '@shared/utils';
import YcModal from './Modal.vue';
const props = withDefaults(defineProps<ModalServiceProps>(), {
  width: 520,
  top: 100,
  mask: true,
  title: '',
  titleAlign: 'center',
  alignCenter: true,
  unmountOnClose: false,
  maskClosable: true,
  hideCancel: false,
  closable: true,
  okText: '确认',
  cancelText: '取消',
  okLoading: false,
  okButtonProps: () => {
    return {};
  },
  cancelButtonProps: () => {
    return {};
  },
  footer: true,
  renderToBody: true,
  popupContainer: '.yc-overlay-modal',
  maskStyle: () => {
    return {};
  },
  modalClass: '',
  modalStyle: () => {
    return {};
  },
  escToClose: true,
  draggable: false,
  fullscreen: false,
  maskAnimationName: 'fade',
  modalAnimationName: 'zoom-modal',
  bodyClass: '',
  bodyStyle: () => {
    return {};
  },
  hideTitle: false,
  simple: false,
  onBeforeCancel: () => {
    return true;
  },
  onBeforeOk: () => {
    return true;
  },
  content: '',
});
const { onClose, serviceClose } = props;
// visible
const visible = ref<boolean>(false);
// 处理close
const handleClose = () => {
  serviceClose?.();
  onClose?.();
};
onMounted(() => {
  visible.value = true;
});
</script>

<style lang="less">
.yc-service-modal {
  .yc-modal-body {
    .yc-modal-body-content {
      width: 100%;
      line-height: 26px;
      color: #474c59;
      font-family: 'PingFang SC';
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
