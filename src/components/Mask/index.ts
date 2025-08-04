import { App } from 'vue';
import _Popup from './index.vue';

export type PopupInstance = InstanceType<typeof _Popup>;
export * from './type';

const Popup = Object.assign(_Popup, {
  install: (app: App) => {
    app.component('Yc' + _Popup.name, _Popup);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcPopup: typeof Popup;
  }
}

export default Popup;
