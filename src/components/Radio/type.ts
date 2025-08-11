import { Direction, ObjectData } from '@shared/type';

export interface RadioProps {
  modelValue?: RadioValue;
  defaultChecked?: boolean;
  value?: RadioValue;
  disabled?: boolean;
}

export interface RadioEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: RadioValue, ev: Event): void;
}

export interface RadioSlots {
  default(): void;
  radio(scope: { checked: boolean; disabled: boolean }): void;
}

export interface RadioGroupProps {
  modelValue?: RadioValue;
  defaultValue?: RadioValue;
  options?: RadioOption[];
  direction?: Direction;
  disabled?: boolean;
}

export interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioValue): void;
  (e: 'change', value: RadioValue): void;
}

export interface RadioGroupSlots {
  default(): void;
  radio(scope: { checked: boolean; disabled: boolean }): void;
  label(scope: { data: ObjectData }): void;
}

export type RadioOption = (
  | RadioValue
  | {
      label?: string;
      value: RadioValue;
      disabled?: boolean;
    }
)[];

export type RadioValue = string | number | boolean;
