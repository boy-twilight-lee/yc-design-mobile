import { CSSProperties } from 'vue';
import { ClassName, PopupContainer } from '@shared/type';
export interface FloatingPopupProps {
  visible?: boolean;
  defaultVisible?: boolean;
  overlay?: boolean;
  overlayClass?: ClassName;
  overlayStyle?: CSSProperties;
  overlayClosable?: boolean;
  popupClass?: ClassName;
  popupStyle?: CSSProperties;
  popupContainer?: PopupContainer;
  round?: boolean;
  zIndex?: number;
  lockScroll?: boolean;
  unmountOnClose?: boolean;
  title?: string;
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
  (e: 'overlay-click', ev: MouseEvent): void;
  (e: 'header-left-click', ev: MouseEvent): void;
  (e: 'position-change', y: number): void;
  (e: 'before-open'): void;
  (e: 'open'): void;
  (e: 'before-close'): void;
  (e: 'close'): void;
}
