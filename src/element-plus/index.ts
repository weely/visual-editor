import {
  ElButton,
  ElTabs,
  ElTabPane
} from 'element-plus'
import type { App } from 'vue'

function install(app: App) {
  app.config.globalProperties.$ELEMENT = {
    size: 'small'
  }
  app.use(ElButton)
  app.use(ElTabs)
  app.use(ElTabPane)
}

export default {
  install
}
