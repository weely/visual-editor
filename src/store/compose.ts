import { defineStore } from 'pinia'
import type { AreaData } from '@/types/store'
import { querySelector } from '@/utils/index'

interface ComposeStore {
  areaData: AreaData,
  editorDom: any
}

export const useComposeStore = defineStore('compose', {
  state: (): ComposeStore => ({
    areaData: { // 选中区域包含的组件以及区域位移信息
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        rotate: 0
      },
      components: [],
    },
    editorDom: null,
  }),
  getters: {

  },
  actions: {
    setAreaData(state: AreaData): void {
      this.areaData = state
    },
    setEditor(): void {
      this.editorDom = querySelector('#editor')
    },
  },
})

