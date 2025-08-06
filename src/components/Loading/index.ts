import { App } from 'vue';
import _Loading from './index.vue';

export type LoadingInstance = InstanceType<typeof _Loading>;
export * from './type';

const Loading = Object.assign(_Loading, {
  install: (app: App) => {
    app.component('Yc' + _Loading.name, _Loading);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcLoading: typeof Loading;
  }
}

export default Loading;
