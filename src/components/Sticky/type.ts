import { TargetContainer } from '@shared/type';

export interface StickyProps {
  offsetTop?: number;
  offsetBottom?: number;
  target?: TargetContainer;
  targetContainer?: TargetContainer;
}

export interface StickyEmits {
  (e: 'change', fixed: boolean): void;
}

export interface StickySlots {
  default(): void;
}

export interface StickyExpose {
  updatePosition(): void;
}
