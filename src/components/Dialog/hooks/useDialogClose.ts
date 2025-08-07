import { ref, Ref, watch } from 'vue';
import { DialogEmits } from '@/components/Dialog/type';
import { OnBeforeOk, OnBeforeCancel } from '../type';
import { useControlValue } from '@shared/utils';
import useOnBeforeClose from './useOnBeforeClose';

export type CloseEventType = 'confirmBtn' | 'cancelBtn' | 'overlay';

export default (params: {
  visible: Ref<boolean | undefined>;
  defaultVisible: Ref<boolean>;
  overlayClosable: Ref<boolean>;
  lockScroll: Ref<boolean>;
  onBeforeOk?: OnBeforeOk;
  onBeforeCancel?: OnBeforeCancel;
  emits: any;
}) => {
  const {
    overlayClosable,
    visible,
    defaultVisible,
    lockScroll,
    onBeforeCancel,
    onBeforeOk,
    emits,
  } = params;
  // 外层visible，用于播放动画
  const outerVisible = ref<boolean>(false);
  // loading
  const asyncLoading = ref<boolean>(false);
  // 内存visible，用于显示组件
  const innerVisible = useControlValue<boolean>(
    visible,
    defaultVisible.value,
    (val) => {
      emits('update:visible', val);
    }
  );
  // 处理动画离开
  const handleAfterLeave = () => {
    emits('close');
    outerVisible.value = false;
  };
  // 处理关闭
  const handleClose = async (
    type: CloseEventType,
    ev: MouseEvent,
    onClose?: (ev: Event) => void
  ) => {
    if (onBeforeCancel && onBeforeOk) {
      // 执行关闭之前的函数
      const isClose = ['confirmBtn', 'cancelBtn'].includes(type)
        ? await useOnBeforeClose(type, asyncLoading, onBeforeOk, onBeforeCancel)
        : true;
      if (!isClose) return;
    }
    if (type == 'overlay' && !overlayClosable.value) {
      return;
    }
    if (type == 'confirmBtn') {
      emits('ok');
    }
    onClose?.(ev);
    innerVisible.value = false;
  };

  // 检测
  watch(
    () => innerVisible.value,
    (val) => {
      document.body.style.overflow = val && lockScroll.value ? 'hidden' : '';
      if (!val) return;
      outerVisible.value = val;
    },
    {
      immediate: true,
    }
  );

  return {
    asyncLoading,
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave,
  };
};
