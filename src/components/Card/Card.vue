<template>
  <v-card >
    <v-row>
      <v-col>
        <v-img class="white--text align-end" height="200px" width="200px"
          :src="matrixable.img" >
          <v-card-title class="justify-center">{{ matrixable.name }}</v-card-title>
        </v-img>
      </v-col>
      <v-col>
        <v-card-title class="text-left">Teaches:</v-card-title>
        <v-card-subtitle class="text-right"><span v-for="(discipline, index) in matrixable.disciplines" :key="index"><i>{{ discipline }}</i><i v-if="index != matrixable.classes.length-1">, </i></span>
        </v-card-subtitle>
        <v-card-title class="text-left">Active Classes:</v-card-title>
        <v-card-subtitle class="text-right"><span v-for="(classTaught, index) in matrixable.classes" :key="index"><i>{{ classTaught }}</i><i v-if="index != matrixable.classes.length-1">, </i></span>
        </v-card-subtitle>
      </v-col>
      <v-col>
        <Matrix :matrixable="matrixable" />
      </v-col>
      <v-col hidden>
        <v-card-text class="py-1"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
        <v-card-text class="py-1"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
        <v-card-text class="py-1"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
        <v-card-text class="py-1"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
        <v-card-text class="py-1"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
        <v-card-text class="py-1"><b>Instructive:</b> Highly Instructive. <i>Match.</i></v-card-text>
      </v-col>
    </v-row>
    <!-- <v-icon style="font-size: 12em;">mdi-account</v-icon> -->
  </v-card>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix'

export default {
  props: [ "matrixable" ],
  components: {
    Matrix
  }
}
</script>

<style>

</style>