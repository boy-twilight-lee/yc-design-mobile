<template>
  <div
    class="yc-pull-refresh"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      class="yc-pull-refresh-track"
      :style="{
        transform: `translate3d(0px,${(loading ? headerHeight : y) / 3.75}vw,0px)`,
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
        <span v-if="y > 0 && y < pullDistance" class="yc-pulling-text">
          {{ pullingText }}
        </span>
        <span v-if="y >= pullDistance" class="yc-loosing-text">
          {{ loosingText }}
        </span>
        <template v-if="loading">
          <yc-loading :size="16" stroke-color="rgb(150, 151, 153)" />
          <span class="yc-loading-text">
            {{ loadingText }}
          </span>
        </template>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { PullRefreshProps, PullRefreshEmits, PullRefreshSlots } from './type';
defineOptions({
  name: 'PullRefresh',
});
defineSlots<PullRefreshSlots>();
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
  disabled: false,
});
const emits = defineEmits<PullRefreshEmits>();
const { disabled, pullDistance, loading, headerHeight, animationDuration } =
  toRefs(props);
// 刷新ref
const trackRef = ref<HTMLDivElement>();
// 是否触摸
const isTouch = ref<boolean>(false);
// 之前的y
const preY = ref(0);
// 现在的y
const y = ref(0);
// 处理拖拽开始
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length > 1 || loading.value || disabled.value) {
    return;
  }
  trackRef.value!.style.transition = 'none';
  isTouch.value = true;
  preY.value = e.touches[0].clientY;
};
// 处理拖拽移动
const handleTouchMove = (e: TouchEvent) => {
  if (
    e.touches.length > 1 ||
    !isTouch.value ||
    disabled.value ||
    loading.value
  ) {
    return;
  }
  const offsetY = e.touches[0].clientY - preY.value;
  y.value = offsetY < 0 ? 0 : offsetY;
  y.value =
    offsetY > pullDistance.value
      ? pullDistance.value + (offsetY - pullDistance.value) / 5
      : offsetY;
};
// 处理拖拽结束
const handleTouchEnd = async (e: TouchEvent) => {
  if (e.touches.length > 1 || loading.value || disabled.value) {
    return;
  }
  isTouch.value = false;
  preY.value = 0;
  const offsetY = y.value;
  y.value = 0;
  if (offsetY < pullDistance.value) return;
  emits('refresh');
  trackRef.value!.style.transition = `transform ${animationDuration.value / 1000}s ease`;
};
</script>

<style lang="less" scoped>
@import './style/pull-refresh.less';
</style>
