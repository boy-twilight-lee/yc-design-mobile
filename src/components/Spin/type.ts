export interface SpinProps {
  size?: number;
  loading?: boolean;
  dot?: boolean;
  tip?: string;
  hideIcon?: boolean;
  // 是否size继承
  isSizeInherit?: boolean;
}

export interface SpinSlots {
  default(): void;
  icon(): void;
  tip(): void;
}
