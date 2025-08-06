import { CSSProperties } from 'vue';
import { ClassName, PopupContainer } from '@shared/type';
export interface TriggerProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  position?: TriggerPostion;
  disabled?: boolean;
  popupOffset?: number;
  popupTranslate?: number[];
  showArrow?: boolean;
  clickToClose?: boolean;
  clickOutsideToClose?: boolean;
  unmountOnClose?: boolean;
  contentClass?: ClassName;
  contentStyle?: CSSProperties;
  arrowClass?: ClassName;
  arrowStyle?: CSSProperties;
  animationName?: string;
  autoFitPopupWidth?: boolean;
  autoFitPopupMinWidth?: boolean;
  popupContainer?: PopupContainer;
  zIndex?: number;
  // 是否需要trasformOrigin
  needTransformOrigin?: boolean;
  // 各个回调
  onTriggerMouseclick?: () => void;
  onClickOutSide?: () => void;
}

export interface TriggerEmits {
  (e: 'update:popupVisible', value: boolean): void;
  (e: 'popup-visible-change', value: boolean): void;
  (e: 'show'): void;
  (e: 'hide'): void;
}

export interface TriggerSlots {
  default(): void;
  content(): void;
}

export interface TriggerExpose {
  hide(): void;
  show(): void;
}

export type TriggerPostion =
  | 'top'
  | 'tl'
  | 'tr'
  | 'bottom'
  | 'bl'
  | 'br'
  | 'left'
  | 'lt'
  | 'lb'
  | 'right'
  | 'rt'
  | 'rb';
