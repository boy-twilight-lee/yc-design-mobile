import { App } from 'vue';
import _PopupSwiper from './index.vue';

export type PopupSwiperInstance = InstanceType<typeof _PopupSwiper>;
export * from './type';

const PopupSwiper = Object.assign(_PopupSwiper, {
  install: (app: App) => {
    app.component('Yc' + _PopupSwiper.name, _PopupSwiper);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcPopupSwiper: typeof PopupSwiper;
  }
}

export default PopupSwiper;
