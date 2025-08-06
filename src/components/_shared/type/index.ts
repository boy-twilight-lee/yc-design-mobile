import { Reactive, RenderFunction } from 'vue';

export type Size = 'mini' | 'small' | 'medium' | 'large';

export type Direction = 'vertical' | 'horizontal';

export type PopupContainer = string | HTMLElement;

export type ClassName =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];

export type RenderContent = string | ObjectData[] | RenderFunction;

export type Props = Reactive<Record<string, any>>;

export type ObjectData = Record<string, any>;

export type RequiredDeep<T> = {
  [P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P];
};
