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
    <template v-if="title" #title>
      <component :is="getSlotFunction(title)" />
    </template>
    <div class="yc-modal-body-content">
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
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
