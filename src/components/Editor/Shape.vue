<script setup lang="ts">
import { readonly, computed, reactive } from 'vue'
import type { StrKObj } from '@/types/app'

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
    type: [Number, String],
  },
})

const pointList = readonly(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']) // 八个方向
const obj: StrKObj = {}
const cursors = reactive(obj)
const isActive = () => props.active && !props.element?.isLock

const showPoints = computed(() => {
  return isActive() ? pointList : []
})

function handleRotate(){

}

function selectCurComponent(e: Event) {
  e.stopPropagation()
  e.preventDefault()
  // this.$store.commit('hideContextMenu')
}
function handleMouseDownOnShape() {

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
    @click="selectCurComponent"
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