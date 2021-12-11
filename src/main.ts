import { createApp } from 'vue'
import router from './router/'
import 'normalize.css'
import './middleware'
import './styles/common.scss'
import ElementPlus from './element-plus'
import Icon from './icons'
import store from './store'
import 'virtual:svg-icons-register'
import App from './App.vue'
import dragComponents from '@/drag-components/index'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(Icon)
app.use(dragComponents)
app.mount('#app')
