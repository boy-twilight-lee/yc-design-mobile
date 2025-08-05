import { CSSProperties } from 'vue';
import { ClassName, PopupContainer } from '@shared/type';
export interface PopupProps {
  visible?: boolean;
  defaultVisible?: boolean;
  placement?: PopupPlacement;
  mask?: boolean;
  maskClass?: ClassName;
  maskStyle?: CSSProperties;
  maskClosable?: boolean;
  popupClass?: ClassName;
  popupStyle?: CSSProperties;
  round?: boolean;
  zIndex?: number;
  lockScroll?: boolean;
  unmountOnClose?: boolean;
  width?: number | string;
  height?: number | string;
  popupContainer?: PopupContainer;
}

export interface PopupSlots {
  default(): void;
  popup(params: { visible: boolean }): void;
}

export interface PopupEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'click-mask', ev: MouseEvent): void;
  (e: 'before-open'): void;
  (e: 'open'): void;
  (e: 'before-close'): void;
  (e: 'close'): void;
}

export type PopupPlacement = 'right' | 'left' | 'top' | 'bottom';
