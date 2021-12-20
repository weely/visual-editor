import type { Point } from '@/types/app'
import type { Style } from '@/types/store'

/**
 * 角度转弧度
 * Math.PI = 180 度
 * @param angle 
 * @returns 
 */
function angleToRadian(angle: number): number {
  return angle * Math.PI / 180
}

/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Point}  point  旋转前的点坐标
 * @param   {Point}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {Point}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export function calculateRotatedPointCoordinate(point: Point, center: Point, rotate: number): Point {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x: (point.x - center.x) * Math.cos(angleToRadian(rotate)) - (point.y - center.y) * Math.sin(angleToRadian(rotate)) + center.x,
    y: (point.x - center.x) * Math.sin(angleToRadian(rotate)) + (point.y - center.y) * Math.cos(angleToRadian(rotate)) + center.y,
  }
}

/**
 * 获取旋转后的点坐标
 * @param  {Style} style  元素样式
 * @param  {Point} center 组件中心点
 * @param  {String} name   点： t、b、l、r、lt、rt、lb、rb
 * @return {Object}        旋转后的点坐标
 */
export function getRotatedPointCoordinate(style: Style, center: Point, name: string): Point {
  let point // point 是未旋转前的坐标
  switch (name) {
    case 't':
      point = {
        x: style.left + (style.width / 2),
        y: style.top,
      }

      break
    case 'b':
      point = {
        x: style.left + (style.width / 2),
        y: style.top + style.height,
      }

      break
    case 'l':
      point = {
        x: style.left,
        y: style.top + style.height / 2,
      }

      break
    case 'r':
      point = {
        x: style.left + style.width,
        y: style.top + style.height / 2,
      }

      break
    case 'lt':
      point = {
        x: style.left,
        y: style.top,
      }

      break
    case 'rt':
      point = {
        x: style.left + style.width,
        y: style.top,
      }

      break
    case 'lb':
      point = {
        x: style.left,
        y: style.top + style.height,
      }

      break
    default: // rb
      point = {
        x: style.left + style.width,
        y: style.top + style.height,
      }

      break
  }

  return calculateRotatedPointCoordinate(point, center, style.rotate)
}

// 求两点之间的中点坐标
export function getCenterPoint(p1: Point, p2: Point): Point {
  return {
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2),
  }
}

export function sin(rotate: number): number {
  return Math.abs(Math.sin(angleToRadian(rotate)))
}

export function cos(rotate: number): number {
  return Math.abs(Math.cos(angleToRadian(rotate)))
}

export function mod360(deg: number): number {
  return (deg + 360) % 360
}

export function computeCanvasStyleByScale(scale: any, value: number) {
  return value * parseInt(scale) / 100
}

export function toPercent(val: number) {
  return val * 100 + '%'
}

export function rotateTransform(matrix: Array<Array<any>>){

}

export function scaleTransform(matrix: Array<Array<any>>){

}

export function TranslateTransform(matrix: Array<Array<any>>){

}
