<template>
  <div class="yc-picker">
    <div class="yc-picker-toolbar"></div>
    <div class="yc-picker-columns">
      <div v-if="isSingle" class="yc-picker-column">
        <ul class="yc-picker-column-wrapper">
          <li
            v-for="item in <PickerOptions[]>columns"
            :key="item.value"
            class="yc-picker-column-item"
          >
            <span class="text-ellipsis">{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { PickerProps, PickerEmits, PickerOptions } from './type';
import { valueToPx, isNumber, isArray } from '@shared/utils';
defineOptions({
  name: 'Picker',
});
const props = withDefaults(defineProps<PickerProps>(), {
  columns: () => [],
  title: '',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  toolbarPosition: 'top',
  loading: false,
  showToolbar: true,
  optionHeight: 44,
  visibleOptionNum: 6,
});
const emits = defineEmits<PickerEmits>();
// 是否是单列
const isSingle = computed(() => !isArray(props.columns[0]));
// option-height
const optionHeight = computed(() =>
  isNumber(props.optionHeight)
    ? valueToPx(props.optionHeight)
    : props.optionHeight
);
// total-height
const totalHeight = computed(() => {
  return valueToPx(
    Number.parseInt(props.optionHeight.toString()) * props.visibleOptionNum
  );
});
</script>

<style lang="less" scoped>
.yc-picker {
  position: relative;
  user-select: none;
  background: #fff;
  .yc-picker-columns {
    height: v-bind(totalHeight);
    display: flex;
    .yc-picker-column {
      flex: 1;
      flex-shrink: 0;
      font-size: 16px;
      .yc-picker-column-wrapper {
        display: flex;
        flex-direction: column;
        .yc-picker-column-item {
          height: v-bind(optionHeight);
          line-height: v-bind(optionHeight);
          text-align: center;
        }
      }
    }
  }
}
</style>
