<script setup lang="ts">
import { readonly, computed, reactive, nextTick } from 'vue'
import type { StrKObj } from '@/types/app'
import { useAppStore } from '@/store/app'

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

const appStore = useAppStore()
const pointList = readonly(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']) // 八个方向
const obj: StrKObj = {}
const cursors = reactive(obj)
const isActive = () => props.active && !props.element?.isLock

const showPoints = computed(() => {
  return isActive() ? pointList : []
})

function handleRotate(){

}

function handleMouseDownOnShape(e: MouseEvent) {
  // 按钮等组件，阻止默认事件
  e.preventDefault()
  e.stopPropagation()

  appStore.setComponentStatus(true)
  appStore.setCurComponent(props.element, props.index)

  // this.cursors = this.getCursor() // 根据旋转角度获取光标位置

  const comStyle = { ...props.defaultStyle }
  const startX = e.clientX
  const startY = e.clientY
  console.log(e)
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

function handleMouseDownOnPoint(point: string, e: any) {

}
function getPointStyle(point: string) {
  const { width, height } = props.defaultStyle || {}
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
  } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = Math.floor(height / 2)
      }
  }

  const style = {
      marginLeft: '-4px',
      marginTop: '-4px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: cursors[point],
  }

  return style
}
</script>

<template>
  <div
    class="shape"
    :class="{ active }"
    @click="clickCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <svg-icon v-show="isActive()" name="rotate" @mousedown="handleRotate" class-name="icon-rotate"></svg-icon>
    <svg-icon v-show="element?.isLock" name="lock" @mousedown="handleRotate" class="icon-lock"></svg-icon>
    <div
      class="shape-point"
      v-for="item in showPoints"
      @mousedown="handleMouseDownOnPoint(item, $event)"
      :key="item"
      :style="getPointStyle(item)"
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