import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/components/index.less';
import YcMobile from '@/components';
import 'vant/lib/index.css';
import vant from 'vant';

const app = createApp(App);
app.use(router);
app.use(YcMobile);
app.use(vant);
app.mount('#app');
