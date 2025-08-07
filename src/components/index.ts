import { App, Plugin } from 'vue';
import Button from './Button';
import Dialog from './Dialog';
import ImagePreview from './ImagePreview';
import Loading from './Loading';
import Message from './Message';
import Overlay from './Overlay';
import PopupSwiper from './PopupSwiper';
import Popup from './Popup';
import Popover from './Popover';
import Sticky from './Sticky';
import Trigger from './Trigger';
import Tooltip from './Tooltip';

const components: Record<string, Plugin> = {
  Button,
  Dialog,
  ImagePreview,
  Loading,
  Message,
  Overlay,
  Popup,
  PopupSwiper,
  Popover,
  Sticky,
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
