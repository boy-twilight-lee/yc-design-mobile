export interface PickerProps {
  columns?: PickerOptions[] | PickerOptions[][];
  columnsFieldNames?: Record<string, string>;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  toolbarPosition?: 'top' | 'bottom';
  loading?: boolean;
  showToolbar?: boolean;
  optionHeight?: number | string;
  visibleOptionNum?: number;
  swipeDuration?: number;
}

export interface PickerEmits {
  (e: 'confirm'): void;
  (e: 'cancel'): void;
  (e: 'change'): void;
  (e: 'click-option'): void;
  (e: 'scroll-into'): void;
}

export type PickerOptions = {
  text: string;
  value: string | number;
  disabled?: boolean;
};
