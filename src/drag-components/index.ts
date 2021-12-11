import type { App } from 'vue'
import VButton from './components/VButton.vue'
import VImg from './components/VImg.vue'
import VText from './components/VText.vue'
import VRect from './components/VRect.vue'


function install(app: App) {
  app.component('v-text', VText)
  app.component('v-img', VImg)
  app.component('v-button', VButton)
  app.component('v-rect', VRect)
}

export default {
  install
}
