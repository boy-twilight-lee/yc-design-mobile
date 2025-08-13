<template>
  <div
    class="yc-pull-refresh"
    ref="pullRef"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchEnd"
  >
    <div
      class="yc-pull-refresh-track"
      :style="{
        transform: `translate3d(0px,${y / 3.75}vw,0px)`,
      }"
      ref="trackRef"
    >
      <div
        class="yc-pull-refresh-header"
        :style="{
          top: `-${headerHeight / 3.75}vw`,
          height: `${headerHeight / 3.75}vw`,
        }"
      >
        <span
          v-if="y > pullDistance / 2 && y < pullDistance"
          class="yc-pulling-text"
        >
          <slot name="pulling" :distance="y">
            {{ pullingText }}
          </slot>
        </span>
        <span v-if="y >= pullDistance && !loading" class="yc-loosing-text">
          <slot name="loosing" :distance="y">
            {{ loosingText }}
          </slot>
        </span>
        <span v-if="isSuccess" class="yc-success-text">
          <slot name="success">
            {{ successText }}
          </slot>
        </span>
        <span v-else-if="loading" class="yc-loading-text">
          <slot name="loading" :distance="y">
            <yc-loading :size="16" stroke-color="rgb(150, 151, 153)" />
            {{ loadingText }}
          </slot>
        </span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { PullRefreshProps, PullRefreshEmits, PullRefreshSlots } from './type';
import { sleep } from '@shared/utils';
defineOptions({
  name: 'PullRefresh',
});
const slots = defineSlots<PullRefreshSlots>();
const props = withDefaults(defineProps<PullRefreshProps>(), {
  loading: false,
  pullingText: '下拉即可刷新...',
  loosingText: '释放即可刷新...',
  loadingText: '加载中...',
  successText: '',
  successDuration: 500,
  animationDuration: 300,
  pullDistance: 50,
  headerHeight: 50,
  pullRadio: 2.5,
  disabled: false,
});
const emits = defineEmits<PullRefreshEmits>();
const {
  disabled,
  pullDistance,
  loading,
  headerHeight,
  animationDuration,
  successDuration,
  successText,
  pullRadio,
} = toRefs(props);
// 轨道实例
const trackRef = ref<HTMLDivElement>();
// 刷新实例
const pullRef = ref<HTMLDivElement>();
// 是否触摸
const isTouch = ref<boolean>(false);
// 是否成功
const isSuccess = ref<boolean>(false);
// y
const y = ref(0);
//  之前的Y
let preY = 0;
// 处理拖拽开始
const handleTouchStart = (e: TouchEvent) => {
  const {
    touches,
    touches: [touch],
  } = e;
  if (
    pullRef.value?.scrollTop ||
    touches.length > 1 ||
    touch.force < 0.5 ||
    loading.value ||
    disabled.value
  ) {
    return;
  }
  trackRef.value!.style.transition = 'none';
  isTouch.value = true;
  isSuccess.value = false;
  preY = touch.clientY;
};
// 处理拖拽移动
const handleTouchMove = (e: TouchEvent) => {
  const {
    touches: [touch],
  } = e;
  if (!isTouch.value) {
    return;
  }
  y.value =
    (touch.clientY - preY) / (pullRadio.value <= 1 ? 1 : pullRadio.value);
  y.value = y.value < 0 ? 0 : y.value;
};
// 处理拖拽结束
const handleTouchEnd = async () => {
  if (!isTouch.value) {
    return;
  }
  isTouch.value = false;
  preY = 0;
  if (y.value >= pullDistance.value) {
    y.value = headerHeight.value;
    emits('refresh');
    trackRef.value!.style.transition = `transform ${animationDuration.value / 1000}s ease`;
    await sleep(animationDuration.value);
    isSuccess.value = !!successText.value || !!slots.success;
    y.value = isSuccess.value ? headerHeight.value : 0;
    await sleep(successDuration.value);
  }
  y.value = 0;
};
</script>

<style lang="less" scoped>
@import './style/pull-refresh.less';
</style>
