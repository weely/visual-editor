import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import type { CanvasStyle, OptionalStyle } from '@/types/store'
import { EditMode } from '@/enums/appEnum'

interface AppStore {
  editMode: EditMode,
  canvasStyle: CanvasStyle,
  componentData: Array<any>,
  curComponent: any,
  curComponentIndex: number | undefined,
  componentIsActive: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppStore => ({
    editMode: EditMode.edit, // 编辑器模式 edit preview
    canvasStyle: { // 页面全局数据
      width: 1200,
      height: 740,
      scale: 100,
    },
    componentData: [], // 画布组件数据
    curComponent: null,
    curComponentIndex: undefined,
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    componentIsActive: false,
  }),
  getters: {

  },
  actions: {
    setComponentStatus(status: boolean): void{
      this.componentIsActive = status
    },
    setEditMode(mode: EditMode): void {
      this.editMode = mode
    },
    setCanvasStyle(style: CanvasStyle): void {
      this.canvasStyle = style
    },
    setCurComponent(component: any, index?: number | undefined) {
      this.curComponent = component
      this.curComponentIndex = index
    },
    setShapeStyle(style: OptionalStyle): void{
      // top, left, width, height, rotate
      Object.keys(style).forEach((k: string) => {
        this.curComponent.style[k] = style[k]
      })
    },
    setComponentData(componentData: Array<any>) {
      this.componentData = componentData
    },
    addComponent(component: any, index?: number) {
      if (index !== undefined) {
        this.componentData.splice(index, 0, component)
      } else {
        this.componentData.push(component)
      }
    },
    deleteComponent(index: number | undefined) {
      index = index === undefined ? this.curComponentIndex : index
      
      if (index == this.curComponentIndex) {
        this.curComponentIndex = undefined
        this.curComponent = null
      }
      
      this.componentData.splice(index || 0, 1)
    },
  },
})
