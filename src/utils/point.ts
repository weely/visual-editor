import type { StrKObj } from "@/types/app"

/**
 * LT|T|RT|R|RB|B|BL|L
 * 计算矩形8个方向上的点的偏移量
 */
const computePointPositionFuncGroup = {
  lt: (_w: number, _h: number) => ({ left: 0, top: 0 }),
  t: (w: number, _h: number) => ({ left: w / 2, top: 0 }),
  rt: (w: number, _h: number) => ({ left: w, top: 0 }),
  r: (w: number, h: number) => ({ left: w, top: h / 2 }),
  rb: (w: number, h: number) => ({ left: w, top: h }),
  b: (w: number, h: number) => ({ left: w / 2, top: h }),
  bl: (_w: number, h: number) => ({ left: 0, top: h }),
  l: (_w: number, h: number) => ({ left: 0, top: h / 2 }),
} as StrKObj

/**
 * 
 * @param direction 方向
 * @param w 矩形宽度
 * @param h 矩形高度
 * @returns 
 */
export function computePosition(direction: string, w: number, h: number) {
  return computePointPositionFuncGroup[direction](w, h)
}

// 每个范围的角度对应的光标
const angleToCursor = [
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
]

export function computeCursorOfAngle() {

}
