import {
  ref,
  toRefs,
  Ref,
  computed,
  provide as _provide,
  inject as _inject,
} from 'vue';
import {
  RadioGroupProps as _RadioGroupProps,
  RadioGroupEmits,
  RadioValue,
  RadioOption,
} from '../type';
import { Size, Props, RequiredDeep, ObjectData } from '@shared/type';
import { useControlValue, isObject } from '@shared/utils';

const RADIO_GROUP_CONTEXT_KEY = 'radio-group-context';
interface RadioContext {
  computedValue: Ref<RadioValue | undefined>;
  disabled: Ref<boolean>;
  hasGroup: Ref<boolean>;
  emits: RadioGroupEmits;
}
type RadioGroupProps = RequiredDeep<_RadioGroupProps>;

export default () => {
  const provide = (props: Props, emits: RadioGroupEmits) => {
    const {
      modelValue,
      defaultValue,
      disabled,
      options: _options,
    } = toRefs(props as RadioGroupProps);
    // 受控值
    const computedValue = useControlValue<RadioValue>(
      modelValue,
      defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
        emits('change', val);
      }
    );
    // options
    const options = computed(() => {
      return _options.value.map((item: RadioOption) => {
        return isObject(item)
          ? item
          : {
              label: item,
              value: item,
            };
      }) as ObjectData[];
    });
    // 提供给子组件
    _provide<RadioContext>(RADIO_GROUP_CONTEXT_KEY, {
      computedValue,
      disabled,
      hasGroup: ref(true),
      emits,
    });
    return {
      options,
    };
  };
  const inject = () => {
    // 接收的值
    return _inject<RadioContext>(RADIO_GROUP_CONTEXT_KEY, {
      computedValue: ref(undefined),
      disabled: ref(false),
      hasGroup: ref(false),
      emits: () => {},
    });
  };
  return {
    provide,
    inject,
  };
};
