<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false,
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')

</script>
<template>
  <svg
    :class="[svgClass, spin && 'svg-icon-spin']"
    aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
