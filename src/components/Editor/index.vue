<script setup lang="ts">
import type { Style } from '@/types/store'
import type { StrKObj } from '@/types/app'
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import Grid from './Grid.vue'
import Shape from './Shape.vue'
import { useAppStore } from '@/store/app'
import { useComposeStore } from '@/store/compose'
import { getStyle, getComponentRotatedStyle } from '@/utils'
import { computeCanvasStyleByScale } from '@/utils/translate'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const { curComponent, canvasStyle, componentData } = storeToRefs(useAppStore())
const composeStore = useComposeStore()

const componentList = computed(() => componentData.value)

function handleContextMenu() {

}
function handleMouseDown() {

}

function  getShapeStyle(style: Style) {
  const result: StrKObj = {};
  ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
    if (attr != 'rotate') {
      result[attr] = style[attr] + 'px'
    } else {
      result.transform = 'rotate(' + style[attr] + 'deg)'
    }
  })

  return result
}

function getComponentStyle(style: Style) {
  return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
}

onMounted(() => {
  composeStore.setEditor()
})
</script>

<template>
  <div
    class="editor"
    id="editor"
    :class="{ edit: props.isEdit }"
    :style="{
      width: computeCanvasStyleByScale(canvasStyle.scale, canvasStyle.width) + 'px',
      height: computeCanvasStyleByScale(canvasStyle.scale, canvasStyle.height) + 'px',
    }"
    @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown"
  >
    <!-- 网格背景 -->
    <grid />

    <!-- 页面组件列表 -->
    <shape
      v-for="(item, index) in componentList"
      :style="getShapeStyle(item.style)"
      :key="item.id"
      :active="item.id === curComponent?.id"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
        :id="'component' + item.id" />
    </shape>
  </div>
</template>
<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: .5;

    &:hover {
      cursor: not-allowed;
    }
  }
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>