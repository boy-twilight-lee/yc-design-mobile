<template>
  <div
    :class="[
      'yc-stepper',
      `yc-stepper-size-${size}`,
      {
        'yc-stepper-disabled': disabled,
      },
    ]"
  >
    <!-- minus -->
    <button
      :disabled="disabled || computedValue <= min"
      :class="[
        'yc-stepper-minus',
        {
          'yc-stepper-minus-disabled': disabled || computedValue <= min,
        },
      ]"
      @click="handleStep('minus')"
    >
      <icon-minus />
    </button>
    <!-- input -->
    <input
      :value="computedValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :class="['yc-stepper-input']"
      type="text"
      v-bind="inputAttrs"
      ref="inputRef"
      @input="(ev) => handleInput((ev.target as HTMLInputElement).value, ev)"
      @change="
        async (ev) => {
          await sleep(0);
          $emit('change', +(ev.target as HTMLInputElement).value, ev);
        }
      "
      @focus="$emit('focus', $event)"
      @blur="handleUpdateValue('blur', $event)"
      @keydown="$emit('keydown', $event)"
      @keydown.enter="handleUpdateValue('pressEnter', $event)"
    />
    <!-- plus -->
    <button
      :disabled="disabled || computedValue >= max"
      :class="[
        'yc-stepper-plus',
        {
          'yc-stepper-plus-disabled': disabled || computedValue >= max,
        },
      ]"
      @click="handleStep('plus')"
    >
      <icon-plus />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, nextTick } from 'vue';
import {
  StepperProps,
  StepperEmits,
  StepperSlots,
  StepperExpose,
  StepperValue,
} from './type';
import useCursor from './hooks/useCursor';
import { isNumber, isString, useControlValue, sleep } from '@shared/utils';
import IconMinus from './component/IconMinus.vue';
import IconPlus from './component/IconPlus.vue';
defineOptions({
  name: 'Stepper',
});
defineSlots<StepperSlots>();
const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: undefined,
  defaultValue: '',
  precision: 0,
  step: 1,
  disabled: false,
  max: Infinity,
  min: -Infinity,
  placeholder: '',
  hideButton: false,
  size: 'medium',
  readonly: false,
  inputAttrs: () => {
    return {};
  },
});
const emits = defineEmits<StepperEmits>();
const { modelValue, defaultValue, step, min, max, disabled } = toRefs(props);
// 控制的值
const computedValue = useControlValue<StepperValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  },
  (val) => {
    return isString(val) ? val : handlePrecision(val, 'string');
  }
);
// 精度
const precision = computed(() => {
  const stepPrecision = String(step.value).match(/\.(\d+)/)?.[1]?.length ?? 0;
  return Math.max(...[stepPrecision, props.precision]);
});
// 输入实例
const inputRef = ref<HTMLInputElement>();
// 初始化记录光标位置的hook
const { setCursor, recordCursor } = useCursor(inputRef);
// 保持受控
const keepControl = async () => {
  recordCursor();
  await nextTick();
  if (inputRef.value && computedValue.value !== inputRef.value.value) {
    inputRef.value.value = computedValue.value;
    setCursor();
  }
};
// 处理精度问题
function handlePrecision(value: StepperValue, type: 'number' | 'string') {
  // 处理过后的值
  const handleValue = isNumber(value) ? value : +value;
  // 处理的值
  const numberValue = precision.value
    ? handleValue.toFixed(precision.value)
    : handleValue.toFixed(0);
  return type == 'number' ? +numberValue : numberValue;
}
// 处理点击
const handleStep = (type: 'minus' | 'plus') => {
  let value =
    type == 'minus'
      ? +computedValue.value - step.value
      : +computedValue.value + step.value;
  value = value < min.value ? min.value : value;
  value = value > max.value ? max.value : value;
  // 处理精度
  computedValue.value = handlePrecision(value, 'number');
};
// 处理失焦越界
const handleUpdateValue = (
  type: 'blur' | 'pressEnter',
  e: FocusEvent | KeyboardEvent
) => {
  if (type == 'blur') {
    emits('blur', e as FocusEvent);
  } else {
    emits('pressEnter', e as KeyboardEvent);
  }
  if (!computedValue.value) return;
  let value = +computedValue.value;
  value = value < min.value ? min.value : value;
  value = value > max.value ? max.value : value;
  // 处理精度
  computedValue.value = handlePrecision(value, 'number');
};
// 处理输入
const handleInput = (v: string, e: Event) => {
  if (!v) {
    computedValue.value = v;
    return;
  }
  // 只能输入数字、.、-
  const isInValidNumber = !/^-?\d*\.?\d*$/.test(v);
  // 处理小数点只能一个
  const isInValidPoint = (v.match(/\./g)?.length ?? 0) > 1;
  // 处理－号只能一个,且位置正确
  const isInValidNegative = v.includes('-') && v[0] != '-';
  // 处理逻辑
  if (isInValidNumber || isInValidPoint || isInValidNegative) {
    return keepControl();
  }
  computedValue.value = v;
  emits('input', v, e);
  keepControl();
};
// 暴漏方法
defineExpose<StepperExpose>({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.focus();
  },
});
</script>

<style lang="less" scoped>
@import './style/stepper.less';
</style>
