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
            <span v-for="(discipline, index) in matrixable.disciplines" :key="index">
              <i>{{ discipline }}</i>
              <i v-if="index != matrixable.classes.length-1">, </i>
            </span>
          </v-card-subtitle>

          <v-card-title class="text-left px-0">Active Classes:</v-card-title>
          <v-card-subtitle class="text-right px-0 py-0">
            <span v-for="(classTaught, index) in matrixable.classes" :key="index">
              <i>{{ classTaught }}</i>
              <i v-if="index != matrixable.classes.length-1">, </i>
            </span>
          </v-card-subtitle>
          
          <v-card-title class="text-left px-0">Previous Classes:</v-card-title>
          <!-- <v-card-subtitle class="text-right px-0 py-0">
            <span v-for="(classTaught, index) in matrixable.classes" :key="index">
              <i>{{ classTaught }}</i>
              <i v-if="index != matrixable.classes.length-1">, </i>
            </span>
          </v-card-subtitle> -->
        </v-col>
      </v-expand-x-transition>

      <v-col class="flex-grow-0 pl-0" @click="showWriteup = !showWriteup">
        <Matrix :matrixable="matrixable" />
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
      <v-btn text @click="showRatings = !showRatings">
        RATINGS<v-icon>{{ showRatings ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-row v-show="showRatings">
        <v-col>
        </v-col>
        <v-col>
        </v-col>
        <v-col>
          <Matrix :matrixable="matrixable" />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-card>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix'

export default {
  props: [ "matrixable" ],
  components: {
    Matrix
  },
  data() {
    return {
      showWriteup: false,
      showRatings: false
    }
  }
}
</script>

<style>

</style>