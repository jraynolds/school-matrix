<template>
  <div class="matrix justify-center" :class="{ small: isSmall }" :style="{ width: leg, height: leg }">
    <Labels :labels="labels" v-if="!isSmall" :textColor="textColor" />
    <svg width="200" height="200">
      <defs>
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
          :stroke="lineColor"
          class="labelLine"
          :style="{ opacity: getLineOpacity(index) }" />
        <polygon v-for="(color, index) in polygonColors" 
          :key="index"
          :points="pointArray([6-index, 6-index, 6-index, 6-index, 6-index, 6-index])"
          :fill="color"
          :style="`mask: url(#statsMask${id})`" />
        <polygon :points="pointArray([6,6,6,6,6,6])" 
          :stroke="lineColor"
          style="opacity: 0.4" 
          fill="none" />
        <circle id="help" class="circleOutline" cx="100" cy="100" r="80" :stroke="lineColor" />
        <path id="curve" d="M180,100c0,44.2-35.8,80-80,80s-80-35.8-80-80s35.8-80,80-80S180,55.8,180,100z" fill="transparent" />
      </g>
    </svg>
  </div>
</template>

<script>
import Labels from '@/components/Matrix/Labels'

export default {
  props: {
    matrix: Object,
    type: String,
    lineColor: {
      type: String,
      default: "black"
    },
    textColor: {
      type: String,
      default: "black"
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Labels
  },
  data() {
    let teacherLabels = [
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
    let courseLabels = [
      {
        label: "Experimental",
        isHovered: false
      },
      {
        label: "Hands-on",
        isHovered: false
      },
      {
        label: "Student-led",
        isHovered: false
      },
      {
        label: "Lecturing",
        isHovered: false
      },
      {
        label: "Relevant",
        isHovered: false
      },
      {
        label: "Fast-paced",
        isHovered: false
      }
    ]; 
    let schoolLabels = [
      {
        label: "Resources",
        isHovered: false
      },
      {
        label: "Accommodating",
        isHovered: false
      },
      {
        label: "Transparent",
        isHovered: false
      },
      {
        label: "Progressive",
        isHovered: false
      },
      {
        label: "Demanding",
        isHovered: false
      },
      {
        label: "Grounds",
        isHovered: false
      }
    ];
    let polygonHues = {
      "teacher": 195,
      "course": 110,
      "school": 10
    };
    let polygonColorOffsets = [
      [0, 0, -50, -.6],
      [15, 0, -45, -.7],
      [30, -25, -45, -.7],
      [55, -60, -60, -.8],
      [45, -35, -70, -.85],
      [0, -100, -100, -.9]
    ]
    return {
      polygonHues: polygonHues,
      polygonColorOffsets: polygonColorOffsets,
      polygonLabels: {
        "teacher": teacherLabels,
        "course": courseLabels,
        "school": schoolLabels,
      },
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
      return this.polygonLabels[this.type];
    },
    polygonColors() {
      let colors = [];
      let color = this.polygonHues[this.type];
      for (let offset of this.polygonColorOffsets) {
        let h = color + offset[0];
        let s = 100 + offset[1];
        let l = 100 + offset[2];
        let a = 1 + offset[3];
        colors.push(`hsla(${h}, ${s}%, ${l}%, ${a})`);
      }

      return colors;
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
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.matrix);
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