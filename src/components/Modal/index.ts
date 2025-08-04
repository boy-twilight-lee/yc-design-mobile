import { App, h, render } from 'vue';
import { ModalConfig, ModalUpdateConfig } from './type';
import _Modal from './Modal.vue';
import _ModalService from './ModalService.vue';

export type ModalInstance = InstanceType<typeof _Modal>;
export * from './type';

// 容器实例
let container: HTMLDivElement;
// 打开modal
const open = (props: ModalConfig) => {
  // 挂在容器
  if (!container) {
    container = document.createElement('div');
    container.className = 'yc-overlay yc-overlay-modal';
    document.body.append(container);
  }
  // 关闭函数
  const close = () => {
    render(null, container as HTMLDivElement);
  };
  // 更新函数
  const update = (updateProps: ModalUpdateConfig) => {
    console.log('函数执行了', updateProps);
  };
  // 挂在vnode
  const vnode = h(_ModalService, {
    ...props,
    serviceClose: close,
  });
  // 渲染 VNode 到容器
  render(vnode, container);
  return {
    close,
    update,
  };
};

const Modal = Object.assign(_Modal, {
  install: (app: App) => {
    app.component('Yc' + _Modal.name, _Modal);
    app.config.globalProperties.$modal = Object.assign(Modal, {
      open,
    });
  },
  open,
});

declare module 'vue' {
  export interface GlobalComponents {
    YcModal: typeof Modal;
  }
  export interface ComponentCustomProperties {
    $modal: typeof Modal;
  }
}

export default Modal;
