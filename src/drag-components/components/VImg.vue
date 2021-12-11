<template>
  <div style="overflow: hidden">
    <img :src="propValue">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VImg',
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
img {
  width: 100%;
  height: 100%;
}
</style>