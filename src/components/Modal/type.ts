import { CSSProperties } from 'vue';
import { RenderContent, PopupContainer, ClassName } from '@shared/type';
import { ButtonProps } from '@/components/Button';

export interface ModalProps {
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
  modalClass?: ClassName;
  modalStyle?: CSSProperties;
  maskAnimationName?: string;
  modalAnimationName?: string;
  bodyClass?: ClassName;
  bodyStyle?: CSSProperties;
  onBeforeCancel?: OnBeforeCancel;
  onBeforeOk?: OnBeforeOk;
}

export interface ModalEmits {
  (e: 'update:visible', value: boolean): void;
  (e: 'ok'): void;
  (e: 'cancel', ev: MouseEvent | KeyboardEvent): void;
  (e: 'open'): void;
  (e: 'before-open'): void;
  (e: 'close'): void;
  (e: 'before-close'): void;
}

export interface ModalSlots {
  default(): void;
  header(): void;
  footer(): void;
}

export type ModalConfig = Omit<ModalProps, 'visible' | 'defaultVisible'> & {
  title?: RenderContent;
  content?: RenderContent;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
};

export type ModalUpdateConfig = Omit<
  ModalConfig,
  | 'title'
  | 'content'
  | 'onOk'
  | 'onCancel'
  | 'onBeforeOk'
  | 'onBeforeCancel'
  | 'onOpen'
  | 'onClose'
  | 'onBeforeOpen'
  | 'onBeforeClose'
>;

export type ModalServiceProps = ModalConfig & {
  serviceClose?: () => void;
};

export type ModalReturn = {
  close: () => void;
};

export type OnBeforeOk = (
  done: (closed: boolean) => void
) => void | boolean | Promise<boolean | void>;

export type OnBeforeCancel = () => boolean;
