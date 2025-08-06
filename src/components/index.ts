import { App, Plugin } from 'vue';
import Button from './Button';
import PopupSwiper from './PopupSwiper';
import Popup from './Popup';
import Popover from './Popover';
import Dialog from './Dialog';
import Overlay from './Overlay';
import Loading from './Loading';
import Trigger from './Trigger';
import Tooltip from './Tooltip';

const components: Record<string, Plugin> = {
  Button,
  Dialog,
  Loading,
  Overlay,
  Popup,
  PopupSwiper,
  Popover,
  Trigger,
  Tooltip,
};

export default {
  ...components,
  install(app: App) {
    Object.values(components).forEach((v) => {
      app.use(v);
    });
  },
};
