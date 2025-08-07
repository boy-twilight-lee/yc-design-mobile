import { App } from 'vue';
import _ImagePreview from './index.vue';

export type ImagePreviewInstance = InstanceType<typeof _ImagePreview>;
export * from './type';

const ImagePreview = Object.assign(_ImagePreview, {
  install: (app: App) => {
    app.component('Yc' + _ImagePreview.name, _ImagePreview);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcImagePreview: typeof ImagePreview;
  }
}

export default ImagePreview;
