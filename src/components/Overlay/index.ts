import { App } from 'vue';
import _Overlay from './index.vue';

export type OverlayInstance = InstanceType<typeof _Overlay>;
export * from './type';

const Overlay = Object.assign(_Overlay, {
  install: (app: App) => {
    app.component('Yc' + _Overlay.name, _Overlay);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcOverlay: typeof Overlay;
  }
}

export default Overlay;
