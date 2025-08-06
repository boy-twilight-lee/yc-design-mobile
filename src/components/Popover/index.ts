import { App } from 'vue';
import _Popover from './index.vue';

export type PopoverInstance = InstanceType<typeof _Popover>;
export * from './type';

const Popover = Object.assign(_Popover, {
  install: (app: App) => {
    app.component('Yc' + _Popover.name, _Popover);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcPopover: typeof Popover;
  }
}

export default Popover;
