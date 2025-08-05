import { CSSProperties } from 'vue';
import { ClassName, PopupContainer } from '@shared/type';
export interface FloatingPopupProps {
  visible?: boolean;
  defaultVisible?: boolean;
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
  popupContainer?: PopupContainer;
  title?: string;
  headerLeftText?: string;
  closeable?: boolean;
  anchors?: number[];
  fixedHeight?: boolean;
  durations?: number;
  contentDraggable?: boolean;
}

export interface FloatingPopupSlots {
  default(): void;
  title(): void;
  ['header-left'](): void;
  ['header-right'](): void;
  footer(): void;
}

export interface FloatingPopupEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'click-mask', ev: MouseEvent): void;
  (e: 'click-header-left', ev: MouseEvent): void;
  (e: 'position-change', y: number): void;
  (e: 'before-open'): void;
  (e: 'open'): void;
  (e: 'before-close'): void;
  (e: 'close'): void;
}
