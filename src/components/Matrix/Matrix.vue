<template>
  <div class="matrix" :class="{ small: isSmall }" :style="{ width: leg, height: leg }">
    <Labels :labels="labels" v-if="!isSmall"/>
    <svg width="200" height="200">
      <defs>
        <radialGradient id="statGradient">
          <stop offset="0%" stop-color="#4d77bb" />
          <stop offset="20%" stop-color="#5584d0" />
          <stop offset="40%" stop-color="#5f97e1" />
          <stop offset="60%" stop-color="#65aef6" />
          <stop offset="80%" stop-color="#74cbff" />
          <stop offset="100%" stop-color="#99e5ff" />
        </radialGradient>
        <mask :id="`statsMask${id}`" x="0" y="0" width="200" height="200">
          <polygon class="polyStats" :points="points" />
        </mask>
      </defs>
      <g>
        <line v-for="(rotation, index) of [0, 1, 2, 3, 4, 5]" 
          :key="`ll${index}`" 
          :x1="valueToPoint(6, rotation).x" 
          :y1="valueToPoint(6, rotation).y" 
          :x2="valueToPoint(0, rotation).x" 
          :y2="valueToPoint(0, rotation).y"
          :labels="labels" 
          :stroke="'rgba(0,0,0,1)'"
          class="labelLine"
          :style="{ opacity: getLineOpacity(index) }" />
        <polygon v-for="(color, index) in colors" 
          :key="index"
          :points="pointArray([6-index, 6-index, 6-index, 6-index, 6-index, 6-index])"
          :fill="color"
          :style="`mask: url(#statsMask${id})`" />
        <polygon :points="pointArray([6,6,6,6,6,6])" 
          stroke="rgba(0, 0, 0, 0.2)" 
          fill="none" />
        <circle id="help" class="circleOutline" cx="100" cy="100" r="80" />
        <path id="curve" d="M180,100c0,44.2-35.8,80-80,80s-80-35.8-80-80s35.8-80,80-80S180,55.8,180,100z" fill="transparent" />
      </g>
    </svg>
  </div>
</template>

<script>
import Labels from '@/components/Matrix/Labels'

export default {
  props: [ "matrix", "type", "isSmall" ],
  components: {
    Labels
  },
  data() {
    let professorLabels = [
      {
        label: "Instructive",
        isHovered: false
      },
      {
        label: "Innovative",
        isHovered: false
      },
      {
        label: "Inspirational",
        isHovered: false
      },
      {
        label: "Skillful",
        isHovered: false
      },
      {
        label: "Strict",
        isHovered: false
      },
      {
        label: "Approachable",
        isHovered: false
      }
    ];
    let schoolLabels = []; 
    return {
      colors: [
        "rgba(0,191,255,0.4)",
        "rgba(30,144,255,0.3)",
        "rgba(65,105,225,0.3)",
        "rgba(72,61,139,0.2)",
        "rgba(25,25,112,0.15)",
        "rgba(0,0,0,0.1)"
      ],
      professorLabels: professorLabels,
      schoolLabels: schoolLabels,
      id: parseInt(Math.random()*1000000000, 10)
    }
  },
  computed: {
    leg() {
      if (this.isSmall) return 120;
      return 200;
    },
    points() {
      let points = [];
      let labels = this.labels;
      for (let i=0; i<labels.length; i++) {
        let point = this.valueToPoint(this.matrix[labels[i].label], i);
        points.push(point.x + "," + point.y);
      }
      return points;
    },
    labels() {
      if (this.type == "professor") return this.professorLabels;
      else return this.schoolLabels;
    }
  },
  methods: {
    pointArray(numArray) {
      let points = [];
      for (let i=0; i<6; i++) {
        let point = this.valueToPoint(numArray[i], i);
        points.push(point.x + "," + point.y);
      }
      return points;
    },
    valueToPoint(value, index, total=6, max=6) {
      value *= 100/max;
      var x     = 0;
      var y     = -value * 0.8;
      var angle = Math.PI * 2 / total * index;
      var cos   = Math.cos(angle);
      var sin   = Math.sin(angle);
      var tx    = x * cos - y * sin + 100;
      var ty    = x * sin + y * cos + 100;
      let point = {
        x: Math.round(tx),
        y: Math.round(ty)
      }
      return point;
    },
    getLineOpacity(index) {
      if (this.labels[index].isHovered) return 1;
      else if (this.labels.find(l => l.isHovered)) return 0;
      return 0.1;
    }
  }
}
</script>

<style>
.matrix {
  margin-left: auto;
  margin-right: auto;

  display: grid;
}

.small {
  transform: scale(0.5);
}

.matrix > div, .matrix > svg {
  grid-row: 1/2;
  grid-column: 1/2;
}

.circleOutline {
  fill: transparent;
  stroke: rgba(0, 0, 0, .6);
}

.polyFull {
  fill: rgba(0, 0, 0, .3);
}

.polyStats { 
   /* fill: rgba(0, 0, 0, .8);   */
   stroke: none;
   fill: #ffffff;
}

.label {
  fill: url('#blackToTransparent');
}

.labelLine {
  transition: opacity 1s;
}
</style>