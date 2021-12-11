<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VRect',
  props: {
    propValue: {
      type: String,
      default: '',
    },
    element: {
      type: Object,
    },
  }
})
</script>

<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .canEdit {
    cursor: text;
    height: 100%;
  }
}

.preview {
  user-select: none;
}
</style>