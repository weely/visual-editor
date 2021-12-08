<script setup lang="ts">
import Grid from './Grid.vue'
import { computeCanvasStyleByScale } from '/@/utils/translate'
import { storeToRefs } from 'pinia'
import { appStore } from '/@/store/app'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const { canvasStyle } = storeToRefs(appStore())

function handleContextMenu() {

}
function handleMouseDown() {

}
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
    <!-- 网格线 -->
    <Grid />
 
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