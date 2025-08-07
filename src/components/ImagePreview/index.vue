<template>
  <teleport :to="popupContainer || 'body'">
    <div
      v-if="outerVisible"
      :class="['yc-image-preview-container', $attrs.class]"
      :style="{
        zIndex,
        position: isUndefined(popupContainer) ? 'fixed' : 'absolute',
        ...($attrs.style ?? {}),
      }"
    >
      <!-- overlay -->
      <yc-overlay
        v-if="overlay"
        v-model:visible="innerVisible"
        :overlay-class="overlayClass"
        :z-index="0"
        :overlay-style="{
          position: 'absolute',
          ...overlayStyle,
        }"
      />
      <!-- body -->
      <transition
        name="fade"
        @before-enter="$emit('before-open')"
        @enter="$emit('open')"
        @before-leave="$emit('before-close')"
        @after-leave="handleAfterLeave"
      >
        <div v-show="innerVisible" class="yc-image-preview" ref="containerRef">
          <div class="yc-image-list">
            <div
              v-for="(v, i) in srcList"
              :key="v"
              :class="[
                'yc-image-list-item',
                getSlideClass(i),
                {
                  'yc-image-list-item-current':
                    i == getValidIndex(computedCurrent),
                },
              ]"
              @click.self="handleClose('overlay', $event, false)"
            >
              <img :src="v" :style="style" class="yc-image-preview-img" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, nextTick } from 'vue';
import { ImagePreviewProps, ImagePreviewEmits } from './type';
import { useControlValue, isUndefined } from '@shared/utils';
import Hammer from 'hammerjs';
import usePreviewClose from '@/components/Dialog/hooks/useDialogClose';
import YcOverlay from '@/components/Overlay';
defineOptions({
  name: 'ImagePreview',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<ImagePreviewProps>(), {
  srcList: () => [],
  current: undefined,
  defaultCurrent: 1,
  visible: undefined,
  defaultVisible: false,
  popupContainer: undefined,
  overlay: true,
  overlayClass: '',
  overlayStyle: () => ({}),
  overlayClosable: true,
  lockScroll: true,
  zIndex: 1001,
  defaultScale: 1,
  minScale: 1,
  maxScale: 10,
});
const emits = defineEmits<ImagePreviewEmits>();
const {
  current,
  defaultCurrent,
  visible,
  defaultVisible,
  srcList,
  popupContainer,
  lockScroll,
  overlayClosable,
  defaultScale,
  minScale,
  maxScale,
} = toRefs(props);
// 当前的current
const computedCurrent = useControlValue<number>(
  current,
  defaultCurrent.value,
  (val) => {
    emits('update:current', val);
    emits('change', val);
  }
);
// 处理Modal关闭
const { outerVisible, innerVisible, handleClose, handleAfterLeave } =
  usePreviewClose({
    visible,
    defaultVisible,
    lockScroll,
    overlayClosable,
    emits: emits as any,
  });
// 移动方向
const moveType = ref<string>('positive');
// preIndex
const preIndex = ref<number>(computedCurrent.value);
// 监听手势的容器
const containerRef = ref<HTMLElement>();
// 缩放
const scale = ref<number>(defaultScale.value);
// 拖动
const x = ref<number>(0);
const y = ref<number>(0);
// style
const style = computed(() => ({
  transform: `translate(-50%, -50%) translate(${x.value}px, ${y.value}px) scale(${scale.value})`,
}));
// 获取合法的index
const getValidIndex = (val: number) => {
  const length = srcList.value.length;
  if (val < 0) {
    return length - 1;
  }
  return val > length ? val % length : val;
};
// 动态计算className
const getSlideClass = (index: number) => {
  if (
    computedCurrent.value == preIndex.value ||
    (preIndex.value != index && computedCurrent.value != index)
  ) {
    return;
  }
  const slideType = preIndex.value == index ? '-out' : '-in';
  const siideMoveType = moveType.value == 'positive' ? '' : '-reverse';
  return `yc-carousel-slide-x${slideType}${siideMoveType}`;
};
// 处理action
const handleAction = (action: string) => {
  switch (action) {
    case 'pre':
      {
        moveType.value = 'negative';
        preIndex.value = computedCurrent.value;
        let index = computedCurrent.value - 1;
        index = index < 0 ? srcList.value.length - 1 : index;
        computedCurrent.value = index;
      }
      break;
    case 'next':
      {
        moveType.value = 'positive';
        preIndex.value = computedCurrent.value;
        let index = computedCurrent.value + 1;
        index = index >= srcList.value.length ? 0 : index;
        computedCurrent.value = index;
      }
      break;
  }
};
// 监听组件可见性，动态创建和销毁手势监听
watch(
  () => innerVisible.value,
  async (val) => {
    await nextTick();
    // 处理手势
    let hammer: HammerManager | null = null;
    if (val) {
      preIndex.value = computedCurrent.value;
      if (!containerRef.value) return;
      hammer = new Hammer(containerRef.value);
      // 启用 pinch 和 pan
      hammer.get('pinch').set({ enable: true });
      hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
      // 滑动切换 (Swipe)
      hammer.on('swipeleft', () => {
        if (scale.value > defaultScale.value) return;
        handleAction('next');
      });
      hammer.on('swiperight', () => {
        if (scale.value > defaultScale.value) return;
        handleAction('pre');
      });
      // 捏合缩放 (Pinch)
      let oldScale = 1;
      hammer.on('pinchstart', () => {
        oldScale = scale.value;
      });
      hammer.on('pinchmove', (ev) => {
        scale.value = defaultScale.value * ev.scale;
        emits('scale', scale.value);
      });
      hammer.on('pinchend', () => {
        if (scale.value > maxScale.value) {
          scale.value = maxScale.value;
        }
        if (scale.value < minScale.value) {
          scale.value = minScale.value;
          x.value = 0;
          y.value = 0;
        }
        emits('scale', scale.value);
      });
      // 拖动 (Pan)
      let oldX = 0;
      let oldY = 0;
      hammer.on('panstart', () => {
        if (scale.value <= defaultScale.value) return;
        oldX = x.value;
        oldY = y.value;
      });
      hammer.on('panmove', (ev) => {
        if (scale.value <= defaultScale.value) return;
        x.value = oldX + ev.deltaX;
        y.value = oldY + ev.deltaY;
      });
    } else {
      if (!hammer) return;
      (hammer as HammerManager).destroy();
      hammer = null;
    }
  },
  {
    immediate: true,
  }
);
// 处理状态重置
watch(
  () => [innerVisible.value, computedCurrent.value],
  () => {
    scale.value = defaultScale.value;
    x.value = 0;
    y.value = 0;
  }
);
</script>

<style lang="less" scoped>
@import './style/animation.less';
@import './style/image-preview.less';
</style>
