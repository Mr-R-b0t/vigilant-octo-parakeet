import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/vuex'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/styles.css'

/**
 * Create the main Vue app instance.
 * @type {ReturnType<import("vue").App<import("vue").Component>>}
 */
const app = createApp(App)

// Use Vue Router
app.use(router)

// Use Vuex store
app.use(store)

// Mount the app to the specified element with the ID 'app'.
app.mount('#app')
