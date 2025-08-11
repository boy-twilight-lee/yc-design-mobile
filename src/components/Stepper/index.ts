import { App } from 'vue';
import _Stepper from './index.vue';

export type StepperInstance = InstanceType<typeof _Stepper>;
export * from './type';

const Stepper = Object.assign(_Stepper, {
  install: (app: App) => {
    app.component('Yc' + _Stepper.name, _Stepper);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcStepper: typeof Stepper;
  }
}

export default Stepper;
