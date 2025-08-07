<template>
  <button
    :class="[
      'yc-switch',
      `yc-switch-shape-${type}`,
      `yc-switch-size-${size}`,
      compuedChecked ? 'yc-switch-checked' : 'yc-switch-unchecked',
      {
        'yc-switch-loading': loading,
        'yc-switch-disabled': disabled,
      },
    ]"
    :aria-checked="compuedChecked"
    role="switch"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @click="handleClick"
  >
    <span class="yc-switch-handle">
      <span class="yc-switch-handle-icon">
        <yc-loading
          v-if="loading"
          :size="13"
          stroke-color="rgb(148, 191, 255)"
        />
        <slot
          v-else
          :name="compuedChecked ? 'checked-icon' : 'unchecked-icon'"
        />
      </span>
    </span>
    <!-- placeholder -->
    <span v-if="showText" class="yc-switch-placeholder">
      <slot :name="compuedChecked ? 'checked' : 'unchecked'">
        {{ compuedChecked ? checkedText : uncheckedText }}
      </slot>
    </span>
    <!-- text -->
    <span v-if="showText" class="yc-switch-text">
      <slot :name="compuedChecked ? 'checked' : 'unchecked'">
        {{ compuedChecked ? checkedText : uncheckedText }}
      </slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, useSlots } from 'vue';
import { SwitchProps, SwitchEmits, SwitchSlots, SwitchValue } from './type';
import { useControlValue, isBoolean } from '@shared/utils';
import YcLoading from '@/components/Loading';
defineOptions({
  name: 'Switch',
});
defineSlots<SwitchSlots>();
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  loading: false,
  type: 'circle',
  size: 'medium',
  checkedValue: true,
  uncheckedValue: false,
  checkedColor: 'rgba(22, 93, 255)',
  uncheckedColor: 'rgb(201, 205, 212)',
  checkedText: '',
  uncheckedText: '',
  beforeChange: () => {
    return true;
  },
});
const emits = defineEmits<SwitchEmits>();
const {
  modelValue,
  defaultChecked,
  checkedValue,
  uncheckedValue,
  disabled,
  type,
  checkedText,
  uncheckedText,
  checkedColor,
  uncheckedColor,
  size,
  loading: _loading,
} = toRefs(props);
const slots = useSlots();
// 计算值
const computedValue = useControlValue<SwitchValue>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 是否选中
const compuedChecked = computed(() => {
  return computedValue.value == checkedValue.value;
});
// 是否展示text
const showText = computed(() => {
  const showCheckedText =
    compuedChecked.value && (checkedText.value || slots.checked);
  const showUncheckedText =
    !compuedChecked.value && (uncheckedText.value || slots.unchecked);
  return (
    type.value != 'line' &&
    size.value != 'small' &&
    (showCheckedText || showUncheckedText)
  );
});
// switch样式
const background = computed(() =>
  compuedChecked.value ? checkedColor.value : uncheckedColor.value
);
//切换loading
const switchLoading = ref<boolean>(false);
// lkoading
const loading = computed(() => switchLoading.value || _loading.value);
// 处理点击
const handleClick = async (e: Event) => {
  if (loading.value || disabled.value) return;
  const newValue = compuedChecked.value
    ? uncheckedValue.value
    : checkedValue.value;
  computedValue.value = newValue;
  emits('change', newValue, e);
};
</script>

<style lang="less" scoped>
.yc-switch {
  background-color: v-bind(background);
  &::after {
    background-color: v-bind(background);
  }
}
@import './style/switch.less';
</style>
