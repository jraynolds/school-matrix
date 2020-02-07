<template>
  <v-card>
    <v-row>
      <v-col class="flex-grow-0 pr-0 image">
        <v-img class="white--text align-end" height="200px" width="200px"
          :src="matrixable.img" >
          <v-card-title class="justify-center">{{ matrixable.name }}</v-card-title>
        </v-img>
      </v-col>

      <v-expand-x-transition>
        <v-col v-show="!showWriteup" class="pl-0" style="max-height: 224px;">
          <v-card-title class="text-left px-0 pt-0">Disciplines Taught:</v-card-title>
          <v-card-subtitle class="text-right px-0 py-0">
            <span v-for="(department, index) in departments" :key="index">
              <i>{{ department }}</i>
              <i v-if="index != departments.length-1">, </i>
            </span>
          </v-card-subtitle>

          <v-card-title class="text-left px-0">Active Classes:</v-card-title>
          <v-card-subtitle class="text-right px-0 py-0">
            <span v-for="(classTaught, index) in activeClasses" :key="index">
              <i>{{ classTaught.title }}</i>
              <i v-if="index != activeClasses.length-1">, </i>
            </span>
          </v-card-subtitle>
          
          <v-card-title class="text-left px-0">Previous Classes:</v-card-title>
        </v-col>
      </v-expand-x-transition>

      <v-col class="flex-grow-0 pl-0" @click="showWriteup = !showWriteup">
        <Matrix :matrix="matrix" :type="type" />
      </v-col>

      <v-expand-x-transition>
        <v-col class="ml-n1 pl-0 align-self-center" height="224" v-show="showWriteup" style="max-height: 224px;">
          <v-spacer />
          <v-card-text class="py-1 px-0"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
          <v-card-text class="py-1 px-0"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
          <v-card-text class="py-1 px-0"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
          <v-card-text class="py-1 px-0"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
          <v-card-text class="py-1 px-0"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
          <v-card-text class="py-1 px-0"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
        </v-col>
      </v-expand-x-transition>
    </v-row>

    <v-card-actions class="justify-center pa-0 mt-n3" style="height: 20px;">
      <v-btn depressed @click="showRatings = !showRatings" 
        color="primary" 
        class="ratingsButton" 
        :style="[ showRatings ? {opacity: '1.0!important'} : {} ]">
        RATINGS
        <v-icon>{{ showRatings ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showRatings" class="ratings">
        <Rating v-for="(rating, index) in ratings" 
          :key="index" 
          :user="rating.user" 
          :index="index"
          :review="rating.review"
          :type="type" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix'
import Rating from '@/components/Card/Rating'

export default {
  props: [ "matrixable", "comments", "type", "users", "classes" ],
  components: {
    Matrix,
    Rating
  },
  data() {
    return {
      showWriteup: false,
      showRatings: false
    }
  },
  computed: {
    departments() {
      let departments = [];
      for (let taughtClass of this.activeClasses) {
        for (let department of taughtClass.departments) {
          if (!departments.includes(department)) departments.push(department);
        }
      }
      return departments;
    },
    activeClasses() {
      return this.classes.filter(c => c.teachers.includes(this.matrixable.id));
    },
    ratings() {
      let ratings = [];
      for (let user of this.users) {
        let teacher = user.teachers.find(t => t.id == this.matrixable.id);
        if (teacher && teacher.review) {
          ratings.push({
            user: user,
            review: teacher.review
          });
        }
      }
      return ratings;
    },
    matrix() {
      let matrixes = [];
      let matrix = {};
      for (let rating of this.ratings) matrixes.push(rating.review.matrix);
      if (matrixes.length == 0) return;
      for (let key in matrixes[0]) {
        let sum = 0;
        for (let matrix of matrixes) sum += matrix[key];
        sum /= matrixes.length;
        matrix[key] = sum;
      }
      return matrix;
    }
  }
}
</script>

<style>
.ratings {
  background-color: aliceblue;
}

.ratingsButton {
  color: white !important;
  opacity: 0.5;
}

.ratingsButton:hover {
  opacity: 1;
}

</style>