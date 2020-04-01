<template>
  <v-row>
    <v-col>
      <h1>Model (Chosen)</h1>
      <ModelViewer :matrices="matrices" :tabs="['Teachers', 'Classes', 'Schools']" />
      <v-btn class="mt-2">Change preferred models</v-btn>
    </v-col>
    <v-col>
      <h1>Model (Aggregate)</h1>
      <h3><i></i></h3>
      <ModelViewer :matrices="aggregateMatrices" :tabs="['Teachers', 'Classes', 'Schools']" />
      <v-btn class="mt-2">See your reviews</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { getDefaultMatrixSet } from '@/components/Matrix/matrices.js'

import ModelViewer from '@/components/ModelViewer'

export default {
  components: {
    ModelViewer
  },
  computed: {
    matrices() {
      return this.$store.getters.user.matrices;
		},
    aggregateMatrices() {
			let aggregates = getDefaultMatrixSet();
      let reviews = this.$store.getters.user.reviews;
			if (!reviews) return aggregates;
      if (reviews.teacher.length > 0) aggregates.teacher = this.getAverageScores(aggregates.teacher, reviews.teacher);
      if (reviews.course.length > 0) aggregates.course = this.getAverageScores(aggregates.course, reviews.course);
      if (reviews.teacher.school > 0) aggregates.school = this.getAverageScores(aggregates.school, reviews.school);

      return aggregates;
    }
  },
  methods: {
    getAverageScores(matrix, reviews) {
      for (let key in matrix) matrix[key] = 0;
      let i=0;
      for (i=0; i<reviews.length; i++) {
        for (let key in matrix) {
          matrix[key] += reviews[i].matrix[key];
        }
      }
      for (let key in matrix) matrix[key] /= (i + 1);
      return matrix;
    },
	},
	mounted() {
		// eslint-disable-next-line no-console
		console.log("Someone send help");
	}
}
</script>

<style>

</style>