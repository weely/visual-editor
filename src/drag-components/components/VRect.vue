<template>
  <div class="rectangle">
    <v-text :propValue="element?.propValue" :element="element" />
  </div>
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
.rectangle {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>