<template>
  <v-container class="fill-height pt-10 pl-10">
    
    <v-dialog
      v-model="dialogOpen"
      max-width="650"
    >
      <MatrixEditor :matrix="dialogMatrix" :type="dialogMatrixType" :doneButton="true" v-on:doneClicked="dialogOpen = false" />
    </v-dialog>

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
      <v-col v-for="(matrix, id) of $store.getters.getUser.matrices" :key="id">
        <v-col cols="12"><h2>{{ upperFirst(id) }} Model</h2></v-col>
        <v-col cols="12"><Matrix :matrix="matrix" :type="id"/></v-col>
        <v-col cols="12">
          <v-btn color="primary" 
            @click.stop="dialogOpen = true; dialogMatrix = userMatrices[matrix]; dialogMatrixType = matrix">
            Edit
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="saveModels()">Save your models</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { updateUserInfo } from "@/scripts/dbActions.js"

import Matrix from "@/components/Matrix/Matrix"
import Instructional from "@/components/Instructional"
import MatrixEditor from "@/components/Matrix/MatrixEditor"

export default {
  components: {
    Matrix,
    Instructional,
    MatrixEditor
  },
  data() {
    return {
      instructionsOpen: false,
      userMatrices: {
      },
      matrixOrder: [ "school", "course", "teacher" ],
      dialogOpen: false,
      dialogMatrix: {},
      dialogMatrixType: ""
    }
  },
  methods: {
    upperFirst(string) {
      return string.slice(0, 1).toUpperCase() + string.slice(1);
    },
    saveModels() {
      updateUserInfo({ matrices: this.userMatrices}, 
        this.$store.getters.getUser.email, this.$store);
    }
  }
}
</script>

<style>

</style>