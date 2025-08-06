import { computed, ref, Ref, onMounted, onBeforeUnmount } from 'vue';
import { isUndefined } from '../utils';
import { useEventListener } from '@vueuse/core';
import * as Hammer from 'hammerjs';

type OnSet = (...args: any) => any;
type OnGet = (...args: any) => any;
type SwipeDirection = 'left' | 'right' | 'top' | 'bottom';

// 处理值受控
export const useControlValue = <T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  onSet: OnSet = (data: T) => data,
  onGet: OnGet = (data: T) => data
) => {
  const controlValue = ref<T>(defaultValue);
  return computed({
    get() {
      const value = isUndefined(modelValue.value)
        ? controlValue.value
        : modelValue.value;
      return onGet(value);
    },
    set(value: T) {
      controlValue.value = value;
      onSet(value);
    },
  });
};

// 处理拖动
// export const useTouch = (
//   target: Ref<any>,
//   options: {
//     onStart?: (e: HammerInput) => void;
//     onMove?: (pos: { x: number; y: number }, e: HammerInput) => void;
//     onEnd?: (e: HammerInput) => void;
//   }
// ) => {
//   const { onStart, onMove, onEnd } = options;
//   // 手势识别实例
//   let hammer: HammerManager | null = null;
//   // 用于存储上一次 panmove 事件的累计偏移量
//   let oldX = 0;
//   let oldY = 0;
//   // 是否拖拽
//   const isDragging = ref<boolean>(false);
//   // 处理相关逻辑
//   onMounted(() => {
//     if (!target.value) return;
//     useEventListener(target, 'touchstart', () => {
//       console.log('touch-start');
//     });
//     useEventListener(target, 'touchmove', () => {
//       console.log('touch-move');
//     });
//     useEventListener(target, 'touchend', () => {
//       console.log('touch-end');
//     });
//     hammer = new Hammer.Manager(target.value);
//     hammer.add(
//       new Hammer.Pan({
//         threshold: 5,
//         direction: Hammer.DIRECTION_ALL,
//       })
//     );
//     hammer.on('panstart', (e) => {
//       isDragging.value = true;
//       oldX = 0;
//       oldY = 0;
//       onStart?.(e);
//     });
//     hammer.on('panmove', (e) => {
//       onMove?.({ x: e.deltaX - oldX, y: e.deltaY - oldY }, e);
//       oldX = e.deltaX;
//       oldY = e.deltaY;
//     });
//     hammer.on('panend', (e) => {
//       isDragging.value = false;
//       onEnd?.(e);
//     });
//   });
//   onBeforeUnmount(() => {
//     hammer?.destroy();
//   });
//   return {
//     isDragging,
//   };
// };

/**
 * 基于原生 Touch 事件实现的拖动 Hook，使用 @vueuse/core/useEventListener。
 * @param target - 目标 DOM 元素的 Ref。
 * @param options - 配置项，包括拖动阈值和事件回调。
 */
export const useTouch = (
  target: Ref<HTMLElement | null | undefined>,
  options: {
    threshold?: number; // 允许自定义拖动阈值
    onStart?: (e: Event) => void;
    onMove?: (
      pos: {
        x: number;
        y: number;
      },
      e: Event
    ) => void;
    onEnd?: (e: Event) => void;
  } = {}
) => {
  const { onStart, onMove, onEnd, threshold = 5 } = options;

  // 是否正在拖拽，暴露给外部使用
  const isDragging = ref<boolean>(false);

  // 内部状态，表示触摸已开始，但尚未达到拖动阈值
  let isPending = false;

  // 记录拖动起始点的坐标
  let startX = 0;
  let startY = 0;

  // 记录上一个 move 事件的坐标，用于计算增量
  let previousX = 0;
  let previousY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    // 只处理单指触摸
    if (e.touches.length !== 1) return;
    const { clientX, clientY } = e.touches[0];
    startX = clientX;
    startY = clientY;
    previousX = startX;
    previousY = startY;
    isPending = true;
    isDragging.value = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if ((!isPending && !isDragging.value) || e.touches.length !== 1) return;
    const { clientX, clientY } = e.touches[0];
    if (isPending && !isDragging.value) {
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < threshold) {
        return;
      }
      isDragging.value = true;
      isPending = false;
      onStart?.(e);
    }
    // 如果正在拖拽，计算并触发 onMove
    if (isDragging.value) {
      // e.preDefault();
      console.log(e, 'ev');
      onMove?.({ x: clientX - previousX, y: clientY - previousY }, e);
      previousX = clientX;
      previousY = clientY;
    }
  };
  const handleTouchEnd = (e: TouchEvent) => {
    if (isDragging.value) {
      onEnd?.(e);
    }
    isDragging.value = false;
    isPending = false;
  };

  useEventListener(target, 'touchstart', handleTouchStart, { passive: true });
  useEventListener(target, 'touchmove', handleTouchMove, { passive: false });
  useEventListener(target, 'touchend', handleTouchEnd);
  useEventListener(target, 'touchcancel', handleTouchEnd);

  return {
    isDragging,
  };
};
// 处理滑动
export const useSwipe = (
  target: Ref<any>,
  onSwipe: (dir: SwipeDirection) => void
) => {
  // 手势识别实例
  let hammer: HammerManager | null = null;
  const direction = ref<SwipeDirection>('left');
  onMounted(() => {
    if (!target.value) return;
    hammer = new Hammer.Manager(target.value);
    hammer.add(
      new Hammer.Swipe({
        // 最小滑动距离（像素）
        threshold: 10,
        // 最小滑动速度
        velocity: 0.3,
      })
    );
    hammer.on('swipe', (e) => {
      switch (e.direction) {
        case Hammer.DIRECTION_LEFT:
          direction.value = 'left';
          break;
        case Hammer.DIRECTION_RIGHT:
          direction.value = 'right';
          break;
        case Hammer.DIRECTION_UP:
          direction.value = 'top';
          break;
        case Hammer.DIRECTION_DOWN:
          direction.value = 'bottom';
          break;
      }
      onSwipe?.(direction.value);
    });
  });
  onBeforeUnmount(() => {
    hammer?.destroy();
  });
  return {
    direction,
  };
};
