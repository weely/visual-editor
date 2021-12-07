<script setup lang="ts">
import generateID from '/@/utils/generateID'
import toast from '/@/utils/toast'
import { ref, reactive, readonly, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { composeStore } from '/@/store/compose'
import { appStore } from '/@/store/app'

const isShowPreview = ref(false)
const needToChange = readonly([
  'top',
  'left',
  'width',
  'height',
  'fontSize',
  'borderWidth',
])
const scale = ref('100%')
const timer = ref(null)
const { areaData, editor } = storeToRefs(composeStore())
const { curComponent, canvasStyleData } = storeToRefs(appStore())

function undo() {
}
function redo() {
  
}
function handleFileChange() {
  toast('只能插入图片')
}
function preview() {
  
}
function save() {
  
}
function clearCanvas() {
  
}
function compose() {
  
}
function decompose() {
  
}
function lock() {
  
}
function unlock() {
  
}
function handleScaleChange() {
  
}
function handlePreviewChange() {
  
}
</script>

<template>
  <div>
    <div class="toolbar">
      <el-button @click="undo">撤消</el-button>
      <el-button @click="redo">重做</el-button>
      <label for="input" class="insert">插入图片</label>
      <input type="file" @change="handleFileChange" id="input" hidden />
      <el-button @click="preview" style="margin-left: 10px;">预览</el-button>
      <el-button @click="save">保存</el-button>
      <el-button @click="clearCanvas">清空画布</el-button>
      <el-button @click="compose" :disabled="!areaData.components.length">组合</el-button>
      <el-button
        @click="decompose"
        :disabled="!curComponent || curComponent.isLock || curComponent.component != 'Group'"
      >拆分</el-button>

      <el-button @click="lock" :disabled="!curComponent || curComponent.isLock">锁定</el-button>
      <el-button @click="unlock" :disabled="!curComponent || !curComponent.isLock">解锁</el-button>
      <div class="canvas-config">
        <span>画布大小</span>
        <input v-model="canvasStyleData.width" />
        <span>*</span>
        <input v-model="canvasStyleData.height" />
      </div>
      <div class="canvas-config">
        <span>画布比例</span>
        <input v-model="scale" @input="handleScaleChange" /> %
      </div>
    </div>

    <!-- 预览 -->
    <Preview v-model="isShowPreview" @change="handlePreviewChange" />
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .canvas-config {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;

    input {
      width: 50px;
      margin-left: 10px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ddd;
      color: #606266;
    }

    span {
      margin-left: 10px;
    }
  }

  .insert {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 10px;

    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: 0;
    }

    &:hover {
      background-color: #ecf5ff;
      color: #3a8ee6;
    }
  }
}
</style>
