<template>
  <svg
    class="base-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    v-html="path"
  ></svg>
</template>

<script>
import icons from '../icons'
export default {
  props: ['name', 'fill', 'stroke', 'strokeWidth'],
  setup(props) {
    const path = icons[props.name]

    return {
      path,
    }
  },
}
</script>
