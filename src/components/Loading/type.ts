export interface LoadingProps {
  size?: number;
  loading?: boolean;
  tip?: string;
  hideIcon?: boolean;
  // 是否size继承
  isSizeInherit?: boolean;
}

export interface LoadingSlots {
  default(): void;
  icon(): void;
  tip(): void;
}
