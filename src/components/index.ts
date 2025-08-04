import { App, Plugin } from 'vue';
import Modal from './Modal';

const components: Record<string, Plugin> = {
  Modal,
};

export default {
  ...components,
  install(app: App) {
    Object.values(components).forEach((v) => {
      app.use(v);
    });
  },
};
