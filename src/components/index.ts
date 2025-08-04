import { App, Plugin } from 'vue';
import Button from './Button';
import Popup from './Popup';
import Modal from './Modal';
import Mask from './Mask';
import Spin from './Spin';

const components: Record<string, Plugin> = {
  Button,
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
