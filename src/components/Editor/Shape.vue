<script setup lang="ts">
import type { StrKObj } from '@/types/app'
import { ref, readonly, computed, nextTick, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { useComposeStore } from '@/store/compose'
import { mod360 } from '@/utils/translate'
import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize'

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  element: {
    require: true,
    type: Object,
  },
  defaultStyle: {
    require: true,
    type: Object,
  },
  index: {
    require: true,
    type: Number,
  },
})

const shape = ref(null)
const appStore = useAppStore()
const composeStore = useComposeStore()
const { curComponent } = storeToRefs(appStore)
const { editorDom } = storeToRefs(composeStore)
const pointList = readonly(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']) // 八个方向
const obj: StrKObj = {}
const cursors = ref(obj)
const isActive = () => props.active && !props.element?.isLock
const showPoints = computed(() => isActive() ? pointList : [])
// 每个点对应的初始角度
const initialAngle = readonly({
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315,
} as StrKObj)
// 每个范围的角度对应的光标
const angleToCursor = readonly([
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
])

function getPointStyle(direction: string) {
  const { width, height } = props.defaultStyle || {}
  const isT = /t/.test(direction)
  const isB = /b/.test(direction)
  const isL = /l/.test(direction)
  const isR = /r/.test(direction)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (direction.length === 2) {
    newLeft = isL ? 0 : width
    newTop = isT ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (isT || isB) {
      newLeft = width / 2
      newTop = isT ? 0 : height
    }

    // 左右两边的点，高度居中
    if (isL || isR) {
      newLeft = isL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  const style = {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors.value[direction],
  }

  return style
}

function getCursor() {
  const rotate = mod360(curComponent.value.style.rotate) // 取余 360
  const result: StrKObj = {}
  let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

  pointList.forEach(point => {
    const angle = mod360(initialAngle[point] + rotate)
    const len = angleToCursor.length
    while (true) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point] = 'nw-resize'
        return
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point] = angleLimit.cursor + '-resize'
        return
      }
    }
  })

  return result
}

function handleRotate(e: MouseEvent){
  appStore.setComponentStatus(true)
  e.preventDefault()
  e.stopPropagation()

  const comStyle = { ...props.defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  const startRotate = comStyle.rotate
  
  // 获取元素中心点位置
  const rect = (shape.value as any)?.getBoundingClientRect()
  if (!rect) {
    return
  }
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // 旋转前的角度
  const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent: MouseEvent) => {
    hasMove = true

    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    // 旋转后的角度
    const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
    // 获取旋转的角度值
    comStyle.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
    // 修改当前组件样式
    appStore.setShapeStyle(comStyle)
  }

  const up = () => {
    // hasMove && this.$store.commit('recordSnapshot')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    cursors.value = getCursor() // 根据旋转角度获取光标位置
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

function handleMouseDownOnShape(e: MouseEvent) {
  // 按钮等组件，阻止默认事件
  e.preventDefault()
  e.stopPropagation()

  appStore.setComponentStatus(true)
  appStore.setCurComponent(props.element, props.index)

  cursors.value = getCursor() // 根据旋转角度获取光标位置

  const comStyle = { ...props.defaultStyle }
  const startX = e.clientX
  const startY = e.clientY
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(comStyle.top)
  const startLeft = Number(comStyle.left)

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = (moveEvent: MouseEvent) => {
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    comStyle.top = curY - startY + startTop
    comStyle.left = curX - startX + startLeft

    // 修改当前组件样式
    appStore.setShapeStyle(comStyle)
    // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
    // 如果不使用 nextTick，吸附后将无法移动
    nextTick(() => {
      // 触发元素移动事件，用于显示标线、吸附功能
      // 后面两个参数代表鼠标移动方向
      // curY - startY > 0 true 表示向下移动 false 表示向上移动
      // curX - startX > 0 true 表示向右移动 false 表示向左移动
      // eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
    })
  }

  const up = () => {
    // hasMove && this.$store.commit('recordSnapshot')
    // 触发元素停止移动事件，用于隐藏标线
    // eventBus.$emit('unmove')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)

}

function clickCurComponent(e: Event) {
  e.stopPropagation()
  e.preventDefault()
  // TODO 收起右键菜单
  // this.$store.commit('hideContextMenu')
}

function isNeedLockProportion() {
  if (props.element?.component != 'Group') return false
  const ratates = [0, 90, 180, 360]
  for (const component of props.element.propValue) {
    if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
      return true
    }
  }
  return false
}

function handleMouseDownOnPoint(point: string, e: any) {
  appStore.setComponentStatus(true)
  e.stopPropagation()
  e.preventDefault()
  const style: any = { ...props.defaultStyle }
  // 组件宽高比
  const proportion = style.width / style.height

  // 组件中心点
  const center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  }

  // 获取画布位移信息
  const editorRectInfo = editorDom?.value.getBoundingClientRect()

  // 获取 point 与实际拖动基准点的差值 @justJokee
  // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285
  const pointRect = e.target.getBoundingClientRect()
  // 当前点击圆点相对于画布的中心坐标
  const curPoint = {
    x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
    y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
  }

  // 获取对称点的坐标
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  }

  // 是否需要保存快照
  let needSave = false
  let isFirst = true

  const needLockProportion = isNeedLockProportion()
  const move = (moveEvent: MouseEvent) => {
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false
      return
    }

    needSave = true
    const curPositon = {
      x: moveEvent.clientX - editorRectInfo.left,
      y: moveEvent.clientY - editorRectInfo.top,
    }

    calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
      center,
      curPoint,
      symmetricPoint,
    })

    appStore.setShapeStyle(style)
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    // needSave && this.$store.commit('recordSnapshot')
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)

}

onMounted(() => {
  if (curComponent.value) {
    cursors.value = getCursor() // 根据旋转角度获取光标位置
  }
})
</script>

<template>
  <div
    class="shape"
    ref="shape"
    :class="{ active }"
    @click="clickCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <svg-icon v-show="isActive()" name="rotate" @mousedown="handleRotate" class-name="icon-rotate"></svg-icon>
    <svg-icon v-show="element?.isLock" name="lock" @mousedown="handleRotate" class="icon-lock"></svg-icon>
    <div
      v-for="item in showPoints"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
.icon-rotate {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 600;
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}
.icon-lock {
  position: absolute;
  top: 0;
  right: 0;
}
</style>