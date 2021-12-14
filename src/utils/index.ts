
import type { StrKObj } from '@/types/app'
import type { Style } from '@/types/store'
import { sin, cos } from '@/utils/translate'

export function querySelector(selector: any): Document {
  return document.querySelector(selector)
}

export function deepCopy(source: StrKObj): StrKObj {
  if (typeof source == 'object') {
    const result: StrKObj = Array.isArray(source) ? [] : {}
    for (const key in source) {
      if (typeof source[key] == 'object') {
        result[key] = deepCopy(source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result
  }

  return source
}


export function getStyle(style: Style, filter:Array<string> = []) {
  const needUnit = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
  ]

  const result: StrKObj = {}
  Object.keys(style).forEach(key => {
    if (!filter.includes(key)) {
      if (key === 'rotate') {
        result.transform = key + '(' + style[key] + 'deg)'
      } else {
        result[key] = style[key]

        if (needUnit.includes(key)) {
          result[key] += 'px'
        }
      }
    }
  })

  return result
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style: Style): Style {
  style = { ...style }
  if (style.rotate != 0) {
    const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
    const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
    style.left += diffX
    style.right = style.left + newWidth

    const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
    const diffY = (newHeight - style.height) / 2 // 始终是正
    style.top -= diffY
    style.bottom = style.top + newHeight

    style.width = newWidth
    style.height = newHeight
  } else {
    style.bottom = style.top + style.height
    style.right = style.left + style.width
  }

  return style
}