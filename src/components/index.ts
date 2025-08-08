import { App, Plugin } from 'vue';
import Button from './Button';
import Checkbox from './Checkbox';
import Dialog from './Dialog';
import ImagePreview from './ImagePreview';
import List from './List';
import Loading from './Loading';
import Message from './Message';
import Overlay from './Overlay';
import PopupSwiper from './PopupSwiper';
import Popup from './Popup';
import Popover from './Popover';
import Radio from './Radio';
import Sticky from './Sticky';
import Switch from './Switch';
import Trigger from './Trigger';
import Tooltip from './Tooltip';

const components: Record<string, Plugin> = {
  Button,
  Checkbox,
  Dialog,
  ImagePreview,
  List,
  Loading,
  Message,
  Overlay,
  Popup,
  PopupSwiper,
  Popover,
  Radio,
  Sticky,
  Switch,
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
