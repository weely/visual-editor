<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToolBar from '@/components/Toolbar.vue'
import ComponentList from '@/components/ComponentList.vue'
import Editor from '@/components/Editor/index.vue'
import AttrList from '@/components/AttrList.vue'
import EventList from '@/components/EventList.vue'
import AnimationList from '@/components/AnimationList.vue'
import { useComposeStore } from '../store/compose'
import { useAppStore } from '../store/app'
import componentList from '../drag-components/component-list'
import generateID from '../utils/generateID'
import { deepCopy } from '../utils/index'

const activeName = ref('attr')
const curComponent = ref()
const composeStore = useComposeStore()
const { areaData, editorDom } = storeToRefs(composeStore)
const appStore = useAppStore()

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
}
function handleDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  const index = e.dataTransfer!.getData('index')
  const rectInfo = editorDom?.value.getBoundingClientRect()

  if (index) {
    const component = deepCopy(componentList![+index])
    component.style.top = e.clientY - rectInfo.y
    component.style.left = e.clientX - rectInfo.x
    component.id = generateID()
    appStore.addComponent(component)
    // this.$store.commit('recordSnapshot')
  }
}
function handleMouseDown() {

}
function deselectCurComponent(){

}
</script>

<template>
  <div class="home">
    <tool-bar />
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <component-list />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div class="content"
          @dragover="handleDragOver"
          @drop="handleDrop"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent">
          <editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <attr-list v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation">
            <animation-list v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
          <el-tab-pane label="事件" name="events">
            <event-list v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
        </el-tabs>
      </section>
    </main>
  </div>
</template>

<style lang="scss">
@import './home.scss';
</style>
