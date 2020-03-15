<template>
  <v-container class="fill-height pt-10 pl-10">
    <v-row>
      <v-col cols="12"><h1>Welcome to your models!</h1></v-col>
      <v-col cols="12"><h3>Set up your preferred shapes here.</h3></v-col>
      <v-col cols="12">If it's your first time setting up these models, would you like 
        <v-btn @click="instructionsOpen = !instructionsOpen"
          v-scroll-to="{ el: '#instructional', offset: -200}" 
          color="primary">an explanation?<v-icon>
        {{ instructionsOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-row id="instructional" v-show="instructionsOpen">
        <Instructional />
      </v-row>
    </v-expand-transition>
    <v-row>
      <v-col>
        <v-col cols="12"><h2>School Model</h2></v-col>
        <v-col cols="12"><Matrix :matrix="userMatrices.school" :type="'school'"/></v-col>
        <v-col cols="12"><v-btn color="primary">Edit</v-btn></v-col>
      </v-col>
      <v-col>
        <v-col cols="12"><h2>Course Model</h2></v-col>
        <v-col cols="12"><Matrix :matrix="userMatrices.course" :type="'course'"/></v-col>
        <v-col cols="12"><v-btn color="primary">Edit</v-btn></v-col>
      </v-col>
      <v-col>
        <v-col cols="12"><h2>Teacher Model</h2></v-col>
        <v-col cols="12"><Matrix :matrix="userMatrices.teacher" :type="'teacher'"/></v-col>
        <v-col cols="12"><v-btn color="primary">Edit</v-btn></v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDefaultMatrixSet } from "@/components/Matrix/matrices.js"

import Matrix from "@/components/Matrix/Matrix"
import Instructional from "@/components/Instructional"
// import MatrixEditor from "@/components/Matrix/MatrixEditor"

export default {
  components: {
    Matrix,
    Instructional,
    // MatrixEditor
  },
  data() {
    return {
      instructionsOpen: false,
      dialogOpen: false,
      userMatrices: {
      }
    }
  },
  beforeMount() {
    this.userMatrices = getDefaultMatrixSet();
  }
}
</script>

<style>

</style>