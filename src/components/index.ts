import { App, Plugin } from 'vue';
import Button from './Button';
import FloatingPopup from './FloatingPopup';
import Popup from './Popup';
import Modal from './Dialog';
import Mask from './Mask';
import Spin from './Spin';
import { useDraggable } from '@vueuse/core';

const components: Record<string, Plugin> = {
  Button,
  FloatingPopup,
  Popup,
  Modal,
  Mask,
  Spin,
};

export default {
  ...components,
  install(app: App) {
    Object.values(components).forEach((v) => {
      app.use(v);
    });
  },
};
