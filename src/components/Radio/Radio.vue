<template>
  <label
    :class="[
      `yc-radio-${checked ? 'checked' : 'unchecked'}`,
      {
        'yc-radio-disabled': computedDisabled,
      },
    ]"
    @click="handleChange"
  >
    <input
      type="radio"
      class="yc-radio-target"
      :value="value"
      :checked="checked"
      :disabled="computedDisabled"
    />
    <slot name="radio" :checked="checked" :disabled="computedDisabled">
      <span class="yc-radio-icon"> </span>
      <span v-if="$slots.default" class="yc-radio-label text-ellipsis">
        <slot />
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { RadioProps, RadioEmits, RadioSlots, RadioValue } from './type';
import { useControlValue } from '@shared/utils';
import useContext from './hooks/useContext';
defineOptions({
  name: 'Radio',
});
defineSlots<RadioSlots>();
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: true,
  type: undefined,
});
const emits = defineEmits<RadioEmits>();
const {
  modelValue,
  defaultChecked,
  value: radioValue,
  disabled,
} = toRefs(props);
// 接收注入
const {
  computedValue: _computedValue,
  disabled: injectDisabled,
  hasGroup,
  emits: _emits,
} = useContext().inject();
// checkbox受控的值
const computedValue = useControlValue<RadioValue>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 用于显示的值
const checked = computed(() => {
  return hasGroup.value
    ? _computedValue.value == radioValue.value
    : computedValue.value;
});
// 计算的disabled
const computedDisabled = computed(() => {
  return injectDisabled.value || disabled.value;
});
// 处理check发生改变
const handleChange = (e: Event) => {
  if (computedDisabled.value) return;
  if (hasGroup.value) {
    _computedValue.value = radioValue.value;
  } else {
    computedValue.value = radioValue.value;
    emits('change', radioValue.value, e);
  }
};
</script>

<style lang="less" scoped>
@import './style/radio.less';
</style>
