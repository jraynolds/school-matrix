<template>
  <v-card>
    <Matrix :matrix="matrixes[0].matrix" :type="matrixes[0].type" v-if="activeTab == 0" />
    <Matrix :matrix="matrixes[1].matrix" :type="matrixes[1].type" v-if="activeTab == 1" />
    <Matrix :matrix="matrixes[2].matrix" :type="matrixes[2].type" v-if="activeTab == 2" />
    <v-card-actions>
      <v-btn class="cardButton" text :class="{ selected: activeTab == 0 }" 
        @click="activeTab = 0">Teachers</v-btn>
      <v-btn class="cardButton" text :class="{ selected: activeTab == 1 }" 
        @click="activeTab = 1">Classes</v-btn>
      <v-btn class="cardButton" text :class="{ selected: activeTab == 2 }" 
        @click="activeTab = 2">Schools</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix'

export default {
  props: [ "matrixes" ],
  components: {
    Matrix
  },
  data() {
    return {
      activeTab: 0
    }
  }
}
</script>

<style>
.cardButton {
  opacity: 0.5;
  transition: opacity 1s;
}

.cardButton:hover {
  opacity: 1.0;
}

.selected {
  opacity: 1.0 !important;
}
</style>