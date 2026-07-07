import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initTheme } from './utils/theme'
import './styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

initTheme()
