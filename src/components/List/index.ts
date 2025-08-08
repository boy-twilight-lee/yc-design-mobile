import { App } from 'vue';
import _List from './index.vue';

export type ListInstance = InstanceType<typeof _List>;
export * from './type';

const List = Object.assign(_List, {
  install: (app: App) => {
    app.component('Yc' + _List.name, _List);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcList: typeof List;
  }
}

export default List;
