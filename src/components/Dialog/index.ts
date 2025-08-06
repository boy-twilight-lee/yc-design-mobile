import { App, h, render } from 'vue';
import { DialogConfig } from './type';
import _Dialog from './Dialog.vue';
import _DialogService from './DialogService.vue';

export type DialogInstance = InstanceType<typeof _Dialog>;
export * from './type';

// 容器实例
let container: HTMLDivElement;
// 打开modal
const open = (props: DialogConfig) => {
  // 挂在容器
  if (!container) {
    container = document.createElement('div');
    container.className = 'yc-overlay yc-overlay-dialog';
    document.body.append(container);
  }
  // 关闭函数
  const close = () => {
    render(null, container as HTMLDivElement);
  };
  // 挂在vnode
  const vnode = h(_DialogService, {
    ...props,
    serviceClose: close,
  });
  // 渲染 VNode 到容器
  render(vnode, container);
  return {
    close,
  };
};

const Dialog = Object.assign(_Dialog, {
  install: (app: App) => {
    app.component('Yc' + _Dialog.name, _Dialog);
    app.config.globalProperties.$dialog = Object.assign(Dialog, {
      open,
    });
  },
  open,
});

declare module 'vue' {
  export interface GlobalComponents {
    YcDialog: typeof Dialog;
  }
  export interface ComponentCustomProperties {
    $dialog: typeof Dialog;
  }
}

export default Dialog;
