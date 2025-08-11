import { Size, ObjectData } from '@shared/type';
import { VNode } from 'vue';
export interface StepperProps {
  modelValue?: StepperValue;
  defaultValue?: StepperValue;
  precision?: number;
  step?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  size?: Size;
  readonly?: boolean;
  inputAttrs?: ObjectData;
}

export interface StepperEmits {
  (e: 'update:modelValue', value: StepperValue): void;
  (e: 'input', value: StepperValue, ev: Event): void;
  (e: 'change', value: StepperValue, ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'keydown', ev: KeyboardEvent): void;
  (e: 'pressEnter', ev: KeyboardEvent): void;
}

export interface StepperSlots {
  plus?: () => VNode[];
  minus?: () => VNode[];
  prefix?: () => VNode[];
  suffix?: () => VNode[];
  prepend?: () => VNode[];
  append?: () => VNode[];
  label?: () => VNode[];
}

export interface StepperExpose {
  focus(): void;
  blur(): void;
}

export type StepperValue = number | string;
export type ModelEvent = 'change' | 'input';
export type StepperFormatter = (value: string) => string;
export type StepperParser = (value: string) => string;
