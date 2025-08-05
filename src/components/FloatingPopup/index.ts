import { App } from 'vue';
import _FloatingPopup from './index.vue';

export type FloatingPopupInstance = InstanceType<typeof _FloatingPopup>;
export * from './type';

const FloatingPopup = Object.assign(_FloatingPopup, {
  install: (app: App) => {
    app.component('Yc' + _FloatingPopup.name, _FloatingPopup);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcFloatingPopup: typeof FloatingPopup;
  }
}

export default FloatingPopup;
