import { CSSProperties } from 'vue';
import { ClassName } from '../_shared/type';

export interface MaskProps {
  visible?: boolean;
  defaultVisible?: boolean;
  zIndex?: number;
  maskClass?: ClassName;
  maskStyle?: CSSProperties;
  unmountOnClose?: boolean;
  maskAnimationName?: string;
}

export interface MaskEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'click', ev: MouseEvent): void;
}

export interface MaskSlots {
  default(): void;
}
