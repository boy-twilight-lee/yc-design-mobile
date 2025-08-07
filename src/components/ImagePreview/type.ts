import { CSSProperties } from 'vue';
import { ClassName, PopupContainer } from '@shared/type';

export interface ImagePreviewProps {
  srcList?: string[];
  current?: number;
  defaultCurrent?: number;
  visible?: boolean;
  defaultVisible?: boolean;
  popupContainer?: PopupContainer;
  overlay?: boolean;
  overlayClass?: ClassName;
  overlayStyle?: CSSProperties;
  overlayClosable?: boolean;
  closable?: boolean;
  lockScroll?: boolean;
  zIndex?: number;
  defaultScale?: number;
  minScale?: number;
  maxScale?: number;
}

export interface ImagePreviewEmits {
  (e: 'update:current', value: number): void;
  (e: 'update:visible', value: boolean): void;
  (e: 'change', value: number): void;
  (e: 'scale', value: number): void;
  (e: 'before-open'): void;
  (e: 'open'): void;
  (e: 'before-close'): void;
  (e: 'close'): void;
}

export interface ImagePreviewSlots {
  default(): void;
}
