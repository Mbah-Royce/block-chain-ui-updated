import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Notifications from '@kyvg/vue3-notification';
import axiosInstance from "../services/AxiosInterceptor";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKET_APP_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKET_APP_SERVER,
    wsPort: 6001,
    disableStats: true,
    forceTLS: false
});

const app = createApp(App).use(store).use(router)
app.use(VueLoading)
app.use(Notifications)
app.config.globalProperties.$api = axiosInstance;
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"