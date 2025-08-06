import { App, Plugin } from 'vue';
import Button from './Button';
import FloatingPopup from './FloatingPopup';
import Popup from './Popup';
import Dialog from './Dialog';
import Overlay from './Overlay';
import Loading from './Loading';

const components: Record<string, Plugin> = {
  Button,
  Dialog,
  FloatingPopup,
  Loading,
  Overlay,
  Popup,
};

export default {
  ...components,
  install(app: App) {
    Object.values(components).forEach((v) => {
      app.use(v);
    });
  },
};
