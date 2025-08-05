import { App } from 'vue';
import _Mask from './index.vue';

export type MaskInstance = InstanceType<typeof _Mask>;
export * from './type';

const Mask = Object.assign(_Mask, {
  install: (app: App) => {
    app.component('Yc' + _Mask.name, _Mask);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcMask: typeof Mask;
  }
}

export default Mask;
