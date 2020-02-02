<template>
  <span class="label" :style="{ transform: rotation }">
    <div class="char" :class="getClass"
      @mouseover="elem.isHovered = true"
      @mouseleave="elem.isHovered = false" >{{ char }}</div>
  </span>
</template>

<script>
export default {
  props: [ "char", "labelIndex", "charIndex", "stringLength", "elem", "elems" ],
  computed: {
    rotation() {
      let rotation = 60 * this.labelIndex;
      rotation += (this.charIndex * 5);
      return `rotate(${rotation}deg)`;
    },
    getClass() {
      if (this.elem.isHovered) {
        return { shown: true };
      } else {
        if (this.elems.find(e => e.isHovered)) return { hidden: true };
        if (this.charIndex < 2) return { shown: true };
        else if (this.charIndex == 2) return { halfShown: true };
        return { hidden: true };
      }
    }
  }
}
</script>

<style>

.label {
  width: 20px;
  margin-left: -8px;
  position: absolute;
  height: 200px;
  user-select: none;
}

.char {
  width: 20px;
  height: 24px;
  
  transition: 1s all;
  opacity: 1;
  pointer-events: all;
}

.hidden {
  opacity: 0;
}

.halfShown {
  opacity: 0.5;
}

.shown {
  opacity: 1;
}
</style>