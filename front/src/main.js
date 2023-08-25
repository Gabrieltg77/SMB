import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueTheMask from 'vue-the-mask';

axios.defaults.baseURL = "http://localhost:3000";


createApp(App).use(router).use(VueTheMask).mount('#app')
