import { App, Plugin } from 'vue';
import Button from './Button';
import Popup from './Popup';
import Modal from './Modal';
import Mask from './Mask';

const components: Record<string, Plugin> = {
  Button,
  Popup,
  Modal,
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
