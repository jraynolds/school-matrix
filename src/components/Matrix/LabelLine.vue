<template>
  <svg>
    <g>
      <line :x1="x1" :x2="x2" :y1="y1" :y2="y2" :style="`stroke: ${color};`" />
    </g>
  </svg>
</template>

<script>
export default {
  props: [ "label", "x1", "x2", "y1", "y2", "color" ]
}
</script>

<style>

</style>