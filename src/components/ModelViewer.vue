<template>
  <v-card>
    <Matrix :matrix="matrices['teacher']" 
      type="teacher" 
      v-if="activeTab == 0" />
    <Matrix :matrix="matrices['course']" 
      type="course" 
      v-if="activeTab == 1" />
    <Matrix :matrix="matrices['school']" 
      type="school" 
      v-if="activeTab == 2" />
    <v-card-actions class="justify-center">
      <v-btn class="cardButton" text :class="{ selected: activeTab == 0 }" 
        @click="activeTab = 0">Teachers</v-btn>
      <v-btn class="cardButton" text :class="{ selected: activeTab == 1 }" 
        @click="activeTab = 1">Courses</v-btn>
      <v-btn class="cardButton" text :class="{ selected: activeTab == 2 }" 
        @click="activeTab = 2">Schools</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix'

export default {
  props: [ "matrices" ],
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