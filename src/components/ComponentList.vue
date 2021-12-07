<script setup lang="ts">
import componentList from '/@/drag-components/component-list'
import SvgIcon from '../icons/SvgIcon.vue'; // 左侧列表数据

function handleDragStart() {

}
</script>

<template>
  <div @dragstart="handleDragStart" class="component-list">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      draggable
      :data-index="index"
    >
      <!-- <Icon :icon="item.icon" class="icon" /> -->
      <svg-icon :iconClass="item.icon" className="item.icon" class="icon" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;

  .list {
    width: 45%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }

    .icon {
      margin-right: 4px;
      font-size: 20px;
    }

    .icon-wenben,
    .icon-tupian {
      font-size: 18px;
    }
  }
}
</style>