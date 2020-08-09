import { createApp } from 'vue';
import app from './App.vue';

export const App = createApp(app as any).mount('#app');
(window as any).access = App;
