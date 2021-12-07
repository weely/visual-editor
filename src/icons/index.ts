import type { App } from 'vue'
// import { Icon } from '@iconify/vue'
import SvgIcon from './SvgIcon.vue'

function install(app: App) {
  // app.component('Icon', Icon)
  app.component('SvgIcon', SvgIcon)
}

export default {
  install
}