import { CSSProperties } from 'vue';
import { ClassName } from '../_shared/type';

export interface OverlayProps {
  visible?: boolean;
  defaultVisible?: boolean;
  zIndex?: number;
  overlayClass?: ClassName;
  overlayStyle?: CSSProperties;
  overlayAnimationName?: string;
  unmountOnClose?: boolean;
}

export interface OverlayEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'overlay-click', ev: MouseEvent): void;
}

export interface OverlaySlots {
  default(): void;
}
