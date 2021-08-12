import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './root_store'

createApp(App).use(store).use(router).mount('#app')
