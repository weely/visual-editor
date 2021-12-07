import { defineStore } from 'pinia'
import type { AreaData } from '/@/types/store'
import { querySelector } from '/@/utils/index'

interface ComposeStore {
  areaData: AreaData,
  editor: any
}

export const composeStore = defineStore('compose', {
  state: (): ComposeStore => ({
    areaData: { // 选中区域包含的组件以及区域位移信息
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      components: [],
    },
    editor: null,
  }),
  getters: {

  },
  actions: {
    setAreaData(state: AreaData): void {
      this.areaData = state
    },
    getEditor(selector: any): void {
      this.editor = querySelector(selector)
    },
  },
})

