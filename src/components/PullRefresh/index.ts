import { App } from 'vue';
import _PullRefresh from './index.vue';

export type PullRefreshInstance = InstanceType<typeof _PullRefresh>;
export * from './type';

const PullRefresh = Object.assign(_PullRefresh, {
  install: (app: App) => {
    app.component('Yc' + _PullRefresh.name, _PullRefresh);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcPullRefresh: typeof PullRefresh;
  }
}

export default PullRefresh;
