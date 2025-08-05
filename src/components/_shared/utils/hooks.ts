import { computed, ref, Ref, onMounted, onBeforeUnmount } from 'vue';
import { isUndefined } from '../utils';
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
export const useTouch = (
  target: Ref<any>,
  options: {
    onStart?: (e: HammerInput) => void;
    onMove?: (pos: { x: number; y: number }, e: HammerInput) => void;
    onEnd?: (e: HammerInput) => void;
  }
) => {
  const { onStart, onMove, onEnd } = options;
  // 手势识别实例
  let hammer: HammerManager | null = null;
  // 用于存储上一次 panmove 事件的累计偏移量
  let oldX = 0;
  let oldY = 0;
  // 是否拖拽
  const isDragging = ref<boolean>(false);
  // 处理相关逻辑
  onMounted(() => {
    if (!target.value) return;
    hammer = new Hammer.Manager(target.value);
    hammer.add(
      new Hammer.Pan({
        threshold: 5,
        direction: Hammer.DIRECTION_ALL,
      })
    );
    hammer.on('panstart', (e) => {
      isDragging.value = true;
      oldX = 0;
      oldY = 0;
      onStart?.(e);
    });
    hammer.on('panmove', (e) => {
      onMove?.({ x: e.deltaX - oldX, y: e.deltaY - oldY }, e);
      oldX = e.deltaX;
      oldY = e.deltaY;
    });
    hammer.on('panend', (e) => {
      isDragging.value = false;
      onEnd?.(e);
    });
  });
  onBeforeUnmount(() => {
    hammer?.destroy();
  });
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
