import { CSSProperties, RenderFunction } from 'vue';
import { ClassName } from '@shared/type';

export interface MessageProps {
  duration?: number;
  content?: string;
  position?: MessagePosition;
  className?: ClassName;
  style?: CSSProperties;
  icon?: RenderFunction;
  beforeClose?: () => void;
  close?: () => void;
  afterClose?: () => void;
}

export type MessagePosition = 'top' | 'center' | 'bottom';
export type MessageConfig = string | Omit<MessageProps, 'type' | 'afterClose'>;
