import { App } from 'vue';
import _Picker from './index.vue';

export type PickerInstance = InstanceType<typeof _Picker>;
export * from './type';

const Picker = Object.assign(_Picker, {
  install: (app: App) => {
    app.component('Yc' + _Picker.name, _Picker);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcPicker: typeof Picker;
  }
}

export default Picker;
