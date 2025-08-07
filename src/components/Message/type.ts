import { CSSProperties, RenderFunction, VNode } from 'vue';
import { ClassName } from '@shared/type';

export interface MessageProps {
  duration?: number;
  content?: string;
  position?: MessagePosition;
  className?: ClassName;
  style?: CSSProperties;
  icon?: VNode;
  beforeClose?: () => void;
  close?: () => void;
  afterClose?: () => void;
}

export type MessagePosition = 'top' | 'center' | 'bottom';
export type MessageConfig = string | Omit<MessageProps, 'type' | 'afterClose'>;
