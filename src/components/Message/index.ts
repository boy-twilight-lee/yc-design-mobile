import { App, h, render } from 'vue';
import _Message from './index.vue';
import { MessageConfig, MessageMethod } from './type';
import { isString } from '@shared/utils';

export type MessageInstance = InstanceType<typeof _Message>;
export * from './type';

// 容器
let container: HTMLDivElement;
// 打开message
const open = (props: MessageConfig) => {
  if (!container) {
    container = document.createElement('div');
    container.className = 'yc-overlay-message';
    document.body.append(container);
  }
  // 关闭函数
  const close = () => {
    render(null, container);
  };
  const message = isString(props) ? { content: props } : { ...props };
  const vnode = h(_Message, {
    ...message,
    afterClose: close,
  });
  // 渲染 VNode 到容器
  render(vnode, container);
  return {
    close,
  };
};
// messageMethod
const messageMethod = {
  open,
} as MessageMethod;
const Message = Object.assign(_Message, {
  install: (app: App) => {
    app.config.globalProperties.$message = Object.assign(
      _Message,
      messageMethod
    );
  },
  ...messageMethod,
});

declare module 'vue' {
  export interface ComponentCustomProperties {
    $message: typeof Message;
  }
}

export default Message;
