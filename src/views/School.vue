<template>
  <v-container class="fill-height" fluid>
    <v-row class="justify-center ml-0">
      <Card :matrixable="school"
        type="school"
        v-on:reviewing="reviewing" />
    </v-row>
    <v-row class="justify-center ml-0">
      <v-col cols="12" class="pb-0 mb-n2">
        <v-card-title class="justify-center">Courses</v-card-title>
      </v-col>
      <v-col v-for="(course, index) of courses"
        :key="index"
        class="d-flex justify-center" >
        <Card :matrixable="course"
          :startsCollapsed="true"
          :isCollapsible="true"
          type="course"
          v-on:reviewing="reviewing"  />
      </v-col>
    </v-row>
    <v-row class="justify-center ml-0">
      <v-col cols="12" class="pb-0 mb-n2">
        <v-card-title class="justify-center">Instructors</v-card-title>
      </v-col>
      <v-col v-for="(teacher, index) of teachers"
        :key="index"
        class="d-flex justify-center" >
        <Card :matrixable="teacher"
          :startsCollapsed="true"
          :isCollapsible="true"
          type="teacher"
          v-on:reviewing="reviewing"  />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDocumentByID, getDocumentsWhere } from "@/scripts/dbActions.js"

import Card from "@/components/Card/Card"

export default {
  name: 'school',
  components: {
    Card
  },
  data() {
    return {
      schoolID: "FYWjaaZYJDzIlweTvd2N",
      school: {},
      courses: [],
      teachers: []
    }
  },
  methods: {
    reviewing(matrixable, type) {
      // eslint-disable-next-line no-console
      console.log(matrixable);
      // eslint-disable-next-line no-console
      console.log(type);
      this.$emit("reviewing", matrixable, type);
    }
  },
  mounted() {
    getDocumentByID("school", this.schoolID).then(school => this.school = school);
    getDocumentsWhere("course", "schools", "array-contains", this.schoolID).then(
      courses => this.courses = courses
    );
    getDocumentsWhere("teacher", "schools", "array-contains", this.schoolID).then(
      teachers => this.teachers = teachers
    );
  }
}
</script>

<style>

</style>