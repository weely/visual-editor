import type { StrKObj } from '@/types/app'

interface Style extends StrKObj {
  top: number
  left: number
  width: number
  height: number
  rotate: number
}

interface OptionalStyle extends StrKObj {
  top?: number
  left?: number
  width?: number
  height?: number
  rotate?: number
}

// 选中区域包含的组件以及区域位移信息
export interface AreaData {
  style: Style,
  components: Array<any>,
}

export interface CanvasStyle { 
  width: number
  height: number
  scale: number
}
