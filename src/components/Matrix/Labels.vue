<template>
  <div class="labels">
    <LabelString v-for="(elem, index) of labels" 
      :key="index" 
      :string="elem.label" 
      :labelIndex="index"
      :elem="elem"
      :elems="labels" />
  </div>
</template>

<script>
import LabelString from '@/components/Matrix/LabelString'

export default {
  props: [ "labels" ],
  components: {
    LabelString
  },
}
</script>

<style>
.labels {
  display: grid;
}
</style>