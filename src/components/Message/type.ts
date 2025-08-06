import { CSSProperties } from 'vue';
import { ClassName, RenderContent } from '@shared/type';

export interface MessageProps {
  duration?: number;
  content?: string;
  className?: ClassName;
  style?: CSSProperties;
  icon?: RenderContent;
  beforeClose?: () => void;
  close?: () => void;
  afterClose?: () => void;
}

export type MessageConfig = string | Omit<MessageProps, 'type' | 'afterClose'>;
export type MessageReutrn = {
  close(): void;
};
export type MessageMethod = {
  open: (config: MessageConfig) => MessageReutrn;
};
