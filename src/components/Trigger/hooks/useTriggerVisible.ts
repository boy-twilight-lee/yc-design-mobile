import { Ref, ref, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { TriggerEmits, TriggerProps } from '../type';
import { Props, RequiredDeep } from '@shared/type';
import { useControlValue } from '@shared/utils';

export default (params: {
  props: Props;
  emits: TriggerEmits;
  popupRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLElement | undefined>;
}) => {
  const { props, emits, popupRef, triggerRef } = params;
  // 解构属性
  const {
    popupVisible,
    defaultPopupVisible,
    clickToClose,
    clickOutsideToClose,
    disabled,
  } = toRefs(props as RequiredDeep<TriggerProps>);
  // 处理事件
  const { onTriggerMouseclick, onClickOutSide } = props;
  // visible
  const computedVisible = useControlValue<boolean>(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits('update:popupVisible', val);
      emits('popup-visible-change', val);
    }
  );
  // timeout
  const timeout = ref<NodeJS.Timeout>();
  // 点击
  const handleClick = () => {
    if (disabled.value) {
      return;
    }
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
    // 触发click事件
    onTriggerMouseclick?.();
  };
  // 点击到contentRef外层关闭
  const handleClickOutsideClose = () => {
    if (!clickOutsideToClose.value) {
      return;
    }
    onClickOutside(
      popupRef,
      () => {
        // 处理正常逻辑
        if (!computedVisible.value || disabled.value) {
          return;
        }
        computedVisible.value = false;
        onClickOutSide?.();
      },
      {
        ignore: [triggerRef],
      }
    );
  };
  // 处理关闭
  handleClickOutsideClose();
  return {
    computedVisible,
    handleClick,
  };
};
