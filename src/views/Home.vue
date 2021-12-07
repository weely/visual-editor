<script setup lang="ts">
import ToolBar from '/@/components/Toolbar.vue'
import ComponentList from '/@/components/ComponentList.vue'
import { ref, reactive } from 'vue'

const activeName = ref('attr')
const curComponent = ref()

function handleDrop() {

}
function handleDragOver() {

}
function handleMouseDown() {

}
function deselectCurComponent(){

}
</script>

<template>
  <div class="home">
    <Toolbar />

    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <ComponentList />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div class="content" @drop="handleDrop" @dragover="handleDragOver"
          @mousedown="handleMouseDown" @mouseup="deselectCurComponent">
          <Editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <AttrList v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation">
            <AnimationList v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
          <el-tab-pane label="事件" name="events">
            <EventList v-if="curComponent" />
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
