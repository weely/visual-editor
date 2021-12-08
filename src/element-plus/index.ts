import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOptionGroup,
  ElOption,
  ElColorPicker
} from 'element-plus'
import type { App } from 'vue'

function install(app: App) {
  app.config.globalProperties.$ELEMENT = {
    size: 'small'
  }
  app.use(ElButton)
  app.use(ElTabs)
  app.use(ElTabPane)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElSelect)
  app.use(ElOptionGroup)
  app.use(ElOption)
  app.use(ElColorPicker)
}

export default {
  install
}
