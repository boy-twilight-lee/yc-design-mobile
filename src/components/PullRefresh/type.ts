export interface PullRefreshProps {
  loading?: boolean;
  pullingText?: string;
  loosingText?: string;
  loadingText?: string;
  successText?: string;
  successDuration?: number;
  animationDuration?: number;
  headerHeight?: number;
  pullDistance?: number;
  // 滑动距离到实际距离的系数，最小1
  pullRadio?: number;
  disabled?: boolean;
}

export interface PullRefreshEmits {
  (e: 'refresh'): void;
}

export interface PullRefreshSlots {
  default(): void;
  pulling(params: { distance: number }): void;
  loosing(params: { distance: number }): void;
  loading(params: { distance: number }): void;
  success(): void;
}
