<script setup lang="ts">
import componentList from '/@/drag-components/component-list'

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
      <svg-icon :name="item.icon" class="icon" :class-name="`icon-${item.icon}`"/>
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
    font-size: 1rem;
    line-height: 1.5;

    &:active {
      cursor: grabbing;
    }

    .icon {
      margin-right: 4px;
      font-size: 20px;
    }
  }
}
</style>