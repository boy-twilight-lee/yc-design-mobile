import { CSSProperties } from 'vue';
import { ClassName, RenderContent } from '@shared/type';

export interface MessageProps {
  duration?: number;
  content?: string;
  position?: MessagePosition;
  className?: ClassName;
  style?: CSSProperties;
  icon?: RenderContent;
  beforeClose?: () => void;
  close?: () => void;
  afterClose?: () => void;
}

export type MessagePosition = 'top' | 'center' | 'bottom';
export type MessageConfig = string | Omit<MessageProps, 'type' | 'afterClose'>;
