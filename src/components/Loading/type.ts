export interface LoadingProps {
  size?: number;
  type?: LoadingType;
  stroke?: number;
  strokeColor?: string;
  strokeCount?: number;
  tip?: string;
}

export interface LoadingSlots {
  default(): void;
  icon(): void;
  tip(): void;
}

export type LoadingType = 'arc' | 'circle' | 'spin';
