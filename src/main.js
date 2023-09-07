/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";
import mitt from 'mitt';

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
const emitter = mitt()

app.config.globalProperties.$eventBus = emitter

app.use(mdiVue, {
  icons: mdijs,
});

registerPlugins(app)

app.mount('#app')
