import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import 'vant/es/toast/style'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Toast } from 'vant'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Toast)
app.use(createPinia())
app.use(router)

app.mount('#app')
