<template>
  <div class="yc-list" ref="scrollRef">
    <slot />
    <!-- loading -->
    <div v-if="loading" class="yc-list-loading">
      <slot name="loading">
        <yc-loading :size="16" stroke-color="rgb(150, 151, 153)" />
        <div class="yc-list-loading-text">
          {{ loadingText }}
        </div>
      </slot>
    </div>
    <!-- error -->
    <div v-else-if="error && errorText" class="yc-list-error-text">
      <slot name="error">
        {{ errorText }}
      </slot>
    </div>
    <!-- finish -->
    <div v-else-if="finished && finishedText" class="yc-list-finish-text">
      <slot name="finish">
        {{ finishedText }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { ListProps, ListEmits, ListSlots } from './type';
import useScrollRech from './hooks/useScrollReach';
import YcLoading from '@/components/Loading';
defineOptions({
  name: 'List',
});
defineSlots<ListSlots>();
const props = withDefaults(defineProps<ListProps>(), {
  loading: false,
  error: false,
  finished: false,
  offset: 0,
  loadingText: '加载中...',
  finishedText: '',
  errorText: '',
  disabled: false,
  direction: 'bottom',
});
const emits = defineEmits<ListEmits>();
const { finished, loading, offset, direction } = toRefs(props);
// srcollRef
const scrollRef = ref<HTMLDivElement>();
// 处理滚动到底
useScrollRech({
  scrollRef,
  offset: {
    left: offset.value,
    right: offset.value,
    bottom: offset.value,
    top: offset.value,
  },
  onReachLeft() {
    if (finished.value || loading.value || direction.value != 'left') return;
    emits('load');
  },
  onReachRight() {
    if (finished.value || loading.value || direction.value != 'right') return;
    emits('load');
  },
  onReachTop() {
    if (finished.value || loading.value || direction.value != 'top') return;
    emits('load');
  },
  onReachBottom() {
    if (finished.value || loading.value || direction.value != 'bottom') return;
    emits('load');
  },
});
</script>

<style lang="less" scoped>
@import './style/list.less';
</style>
