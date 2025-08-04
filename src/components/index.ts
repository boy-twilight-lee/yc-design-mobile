import { App, Plugin } from 'vue';
import Popup from './Popup';
import Modal from './Modal';
import Mask from './Mask';

const components: Record<string, Plugin> = {
  Modal,
  Popup,
  Mask,
};

export default {
  ...components,
  install(app: App) {
    Object.values(components).forEach((v) => {
      app.use(v);
    });
  },
};
