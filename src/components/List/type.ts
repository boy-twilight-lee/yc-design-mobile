export interface ListProps {
  loading?: boolean;
  error?: boolean;
  finished?: boolean;
  offset?: number;
  loadingText?: string;
  errorText?: string;
  finishedText?: string;
  disabled?: boolean;
  direction?: 'top' | 'bottom';
}

export interface ListEmits {
  (e: 'load'): void;
}

export interface ListSlots {
  default(): void;
  error(): void;
  loading(): void;
  finish(): void;
}
