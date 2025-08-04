import { App } from 'vue';
import _Button from './Button.vue';

export type ButonInstance = InstanceType<typeof _Button>;
export * from './type';

const Button = Object.assign(_Button, {
  install: (app: App) => {
    app.component('Yc' + _Button.name, _Button);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcButton: typeof Button;
  }
}

export default Button;
