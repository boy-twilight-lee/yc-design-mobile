import { App } from 'vue';
import _Sticky from './index.vue';

export type StickyInstance = InstanceType<typeof _Sticky>;
export * from './type';

const Sticky = Object.assign(_Sticky, {
  install: (app: App) => {
    app.component('Yc' + _Sticky.name, _Sticky);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcSticky: typeof Sticky;
  }
}

export default Sticky;
