import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/font/font.scss'
import './style/variable.css'
import './style.css'

createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
