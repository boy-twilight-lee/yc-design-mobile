export interface SwitchProps {
  modelValue?: SwitchValue;
  defaultChecked?: SwitchValue;
  disabled?: boolean;
  loading?: boolean;
  type?: SwitchType;
  size?: SwitchSize;
  checkedValue?: SwitchValue;
  uncheckedValue?: SwitchValue;
  checkedColor?: string;
  uncheckedColor?: string;
  checkedText?: string;
  uncheckedText?: string;
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: SwitchValue): void;
  (e: 'change', value: SwitchValue, ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}

export interface SwitchSlots {
  ['checked-icon'](): void;
  ['unchecked-icon'](): void;
  ['checked'](): void;
  ['unchecked'](): void;
}

export type SwitchValue = string | number | boolean;
export type SwitchType = 'circle' | 'round' | 'line';
export type SwitchSize = 'small' | 'medium';
export type BeforeChange = (
  newValue: SwitchValue
) => Promise<boolean | void> | boolean | void;
