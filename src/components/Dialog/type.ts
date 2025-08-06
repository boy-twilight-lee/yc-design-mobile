import { CSSProperties } from 'vue';
import { RenderContent, PopupContainer, ClassName } from '@shared/type';
import { ButtonProps } from '@/components/Button';

export interface DialogProps {
  visible?: boolean;
  defaultVisible?: boolean;
  width?: number | string;
  mask?: boolean;
  maskClosable?: boolean;
  title?: string;
  hideCancel?: boolean;
  hideOk?: boolean;
  okText?: string;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  zIndex?: number;
  unmountOnClose?: boolean;
  popupContainer?: PopupContainer;
  lockScroll?: boolean;
  maskClass?: ClassName;
  maskStyle?: CSSProperties;
  dialogClass?: ClassName;
  dialogStyle?: CSSProperties;
  maskAnimationName?: string;
  dialogAnimationName?: string;
  bodyClass?: ClassName;
  bodyStyle?: CSSProperties;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeOk;
}

export interface DialogEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel', ev: MouseEvent | KeyboardEvent): void;
  (e: 'open'): void;
  (e: 'before-open'): void;
  (e: 'close'): void;
  (e: 'before-close'): void;
}

export interface DialogSlots {
  default(): void;
  header(): void;
  footer(): void;
}

export type DialogConfig = Omit<DialogProps, 'visible' | 'defaultVisible'> & {
  title?: RenderContent;
  content?: RenderContent;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
};

export type DialogServiceProps = DialogConfig & {
  serviceClose?: () => void;
};

export type DialogReturn = {
  close: () => void;
};

export type OnBeforeOk = (
  done: (closed: boolean) => void
) => void | boolean | Promise<boolean | void>;

export type OnBeforeCancel = () => boolean;
