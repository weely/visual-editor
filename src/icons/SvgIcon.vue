<script setup lang="ts">
import { isExternal } from '/@/utils/validate'
import { toRefs, computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

const { iconClass, className } = toRefs(props)
const isExternalUrl = computed(():boolean => isExternal(iconClass.value))
const iconName = computed(():string => `#icon-${iconClass.value}`)
const svgClass = computed(():string => className.value ?  `svg-icon ${className.value}` : 'svg-icon')
const styleExternalIcon = computed(() => ({
  mask: `url(${iconClass.value}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`
}))

</script>
<template>
  <div v-if="isExternalUrl" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :href="iconName" />
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

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
