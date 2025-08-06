import { watch, computed, CSSProperties, Ref, toRefs } from 'vue';
import { useElementBounding, useElementSize } from '@vueuse/core';
import { TriggerProps } from '../type';
import { Props, RequiredDeep } from '@shared/type';
import { unrefElement } from '@vueuse/core';
import { sleep, valueToPx } from '@shared/utils';

export default (params: {
  props: Props;
  popupRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLElement | undefined>;
  arrowRef: Ref<HTMLElement | undefined>;
  computedVisible: Ref<boolean>;
}) => {
  const { props, computedVisible, popupRef, triggerRef, arrowRef } = params;
  const {
    popupTranslate,
    popupOffset,
    autoFitPopupMinWidth,
    autoFitPopupWidth,
    zIndex,
    position,
    arrowStyle: _arrowStyle,
    contentStyle: _contentStyle,
  } = toRefs(props as RequiredDeep<TriggerProps>);
  // 获取popup的size
  const { width: popupWidth, height: popupHeight } = useElementSize(
    popupRef,
    undefined,
    {
      box: 'border-box',
    }
  );
  // 记牌器arrow的size
  const { width: arrowWidth, height: arrowHeight } = useElementSize(
    arrowRef,
    undefined,
    {
      box: 'border-box',
    }
  );
  // 获取trigger元素bounding
  const {
    left,
    top,
    bottom,
    right,
    width: triggerWidth,
    height: triggerHeight,
  } = useElementBounding(triggerRef, {
    updateTiming: 'next-frame',
  });
  // 计算trigger的位置
  const popupStyle = computed(() => {
    // 计算偏移量
    const [translateX, translateY] = popupTranslate.value;
    // 计算偏移量
    let offsetX = translateX;
    let offsetY = translateY;
    if (position.value.startsWith('t')) {
      offsetY = -popupOffset.value;
    } else if (position.value.startsWith('b')) {
      offsetY = popupOffset.value;
    } else if (position.value.startsWith('l')) {
      offsetX = -popupOffset.value;
    } else if (position.value.startsWith('r')) {
      offsetX = popupOffset.value;
    }
    // 计算初始位置
    let offsetTop = 0;
    let offsetLeft = 0;
    // 初始位置计算
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      offsetTop = position.value.startsWith('t')
        ? top.value - popupHeight.value
        : bottom.value;
      if (['top', 'bottom'].includes(position.value)) {
        offsetLeft = left.value + (triggerWidth.value - popupWidth.value) / 2;
      } else if (['tl', 'bl'].includes(position.value)) {
        offsetLeft = left.value;
      } else {
        offsetLeft = right.value - popupWidth.value;
      }
    } else {
      offsetLeft = position.value.startsWith('l')
        ? left.value - popupWidth.value
        : right.value;
      if (['left', 'right'].includes(position.value)) {
        offsetTop = top.value + (triggerHeight.value - popupHeight.value) / 2;
      } else if (['lt', 'rt'].includes(position.value)) {
        offsetTop = top.value;
      } else {
        offsetTop = bottom.value - popupHeight.value;
      }
    }
    return {
      top: valueToPx(offsetTop + offsetY),
      left: valueToPx(offsetLeft + offsetX),
      zIndex: zIndex.value,
    };
  });
  // contentStyle
  const contentStyle = computed(() => {
    return {
      width: autoFitPopupWidth.value ? valueToPx(triggerWidth.value) : '',
      minWidth: autoFitPopupMinWidth.value ? valueToPx(triggerWidth.value) : '',
      ..._contentStyle.value,
    } as CSSProperties;
  });
  // arrowStyle
  const arrowStyle = computed(() => {
    let inset: CSSProperties;
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      let arrowLeft = '';
      let arrowRight = '';
      if (['top', 'bottom'].includes(position.value)) {
        arrowLeft = valueToPx((popupWidth.value - arrowWidth.value) / 2);
      } else if (['tl', 'bl'].includes(position.value)) {
        arrowLeft = valueToPx((triggerWidth.value - arrowWidth.value) / 2);
      } else {
        arrowRight = valueToPx((triggerWidth.value - arrowWidth.value) / 2);
      }
      inset = {
        top: position.value.startsWith('b') ? '0' : '',
        right: arrowRight,
        bottom: position.value.startsWith('t') ? '0' : '',
        left: arrowLeft,
      };
    } else {
      let arrowTop = '';
      let arrowBottom = '';
      if (['left', 'right'].includes(position.value)) {
        arrowTop = valueToPx((popupHeight.value - arrowHeight.value) / 2);
      } else if (['lt', 'rt'].includes(position.value)) {
        arrowTop = valueToPx((triggerHeight.value - arrowHeight.value) / 2);
      } else {
        arrowBottom = valueToPx((triggerHeight.value - arrowHeight.value) / 2);
      }
      inset = {
        top: arrowTop,
        right: position.value.startsWith('l') ? '0' : '',
        bottom: arrowBottom,
        left: position.value.startsWith('r') ? '0' : '',
      };
    }
    return {
      ...inset,
      ..._arrowStyle.value,
    } as CSSProperties;
  });
  // 强制重新获取位置
  watch(
    () => computedVisible.value,
    async (val) => {
      if (!val) return;
      await sleep(0);
      const triggerDom = unrefElement(triggerRef);
      const popupDom = unrefElement(popupRef);
      if (triggerDom) {
        // 获取trigger
        const {
          left: _left,
          right: _right,
          top: _top,
          bottom: _bottom,
          width: _triggerWidth,
          height: _triggerHeight,
        } = triggerDom.getBoundingClientRect();
        left.value = _left;
        right.value = _right;
        top.value = _top;
        bottom.value = _bottom;
        triggerWidth.value = _triggerWidth;
        triggerHeight.value = _triggerHeight;
      }
      // 获取popup
      if (popupDom) {
        const { offsetWidth: _popupWidth, offsetHeight: _popupHeight } =
          popupDom;
        popupWidth.value = _popupWidth;
        popupHeight.value = _popupHeight;
      }
      // 回去arrow
      if (arrowRef.value) {
        const { offsetWidth: _arrowWidth, offsetHeight: _arrowHeight } =
          arrowRef.value;
        arrowWidth.value = _arrowWidth;
        arrowHeight.value = _arrowHeight;
      }
    }
  );
  return {
    position,
    left,
    top,
    bottom,
    right,
    popupWidth,
    popupHeight,
    triggerWidth,
    triggerHeight,
    arrowWidth,
    arrowHeight,
    popupStyle,
    contentStyle,
    arrowStyle,
  };
};
