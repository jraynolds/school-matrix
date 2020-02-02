<template>
  <div class="labelString" :style="{ zIndex: labelIndex+1 }">
    <LabelChar v-for="(char, index) of string.split('')" 
      :key="index" 
      :char="char"
      :labelIndex="labelIndex"
      :charIndex="index"
      :stringLength="string.length"
      :elem="elem"
      :elems="elems" />
  </div>  
</template>

<script>
// import $ from 'jquery'

import LabelChar from '@/components/Matrix/LabelChar'

export default {
  props: [ "string", "labelIndex", "elem", "elems" ],
  components: {
    LabelChar
  }
}
</script>

<style scoped>
.labelString {
  height: 200px;
  grid-row: 1/2; 
  grid-column: 1/2; 
  
  pointer-events: none;
}
</style>