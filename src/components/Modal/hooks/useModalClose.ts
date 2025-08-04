import { ref, Ref, watch } from 'vue';
import { ModalEmits } from '@/components/Modal/type';
import { OnBeforeOk, OnBeforeCancel } from '../type';
import { useControlValue } from '@shared/utils';
import useOnBeforeClose from './useOnBeforeClose';

export default (params: {
  visible: Ref<boolean | undefined>;
  defaultVisible: Ref<boolean>;
  maskClosable: Ref<boolean>;
  onBeforeOk: OnBeforeOk;
  onBeforeCancel: OnBeforeCancel;
  emits: ModalEmits;
}) => {
  const {
    maskClosable,
    visible,
    defaultVisible,
    onBeforeCancel,
    onBeforeOk,
    emits,
  } = params;
  // 外层visible，用于播放动画
  const outerVisible = ref<boolean>(false);
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
  const handleClose = async (type: string, ev: MouseEvent) => {
    // 执行关闭之前的函数
    const isClose = await useOnBeforeClose(type, onBeforeOk, onBeforeCancel);
    if (!isClose) {
      return;
    }
    if (type == 'mask' && !maskClosable.value) {
      return;
    }
    if (type == 'ok') {
      emits('ok');
    }
    emits('cancel', ev);
    innerVisible.value = false;
  };

  // 检测
  watch(
    () => innerVisible.value,
    (val) => {
      document.body.style.overflow = val ? 'hidden' : '';
      if (!val) return;
      outerVisible.value = val;
    },
    {
      immediate: true,
    }
  );

  return {
    outerVisible,
    innerVisible,
    handleClose,
    handleAfterLeave,
  };
};
