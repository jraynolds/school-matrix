<template>
  <v-col id="detailsHolder" class="flex-column pb-6" style="max-height: 224px;">

    <v-row class="d-flex flex-column" 
      v-for="(title, index) of titles[type]" 
      :key="index"
      style="flex-wrap: nowrap;"
      :style="index != 0 ? 'overflow-y: auto' : {} " >
      <v-card-title class="text-left px-0 pt-0">{{ title }}:</v-card-title>
      <v-card-subtitle class="text-right px-0 py-0" style="overflow-y: auto;">
        <span>{{ row(title) }}</span>
      </v-card-subtitle>
    </v-row>

  </v-col>
</template>

<script>
import { getDocumentsWhere, getDocumentsByIDs } from "@/scripts/dbActions.js"

export default {
  props: [ "type", "matrixable" ],
  data() {
    let titles = {
      school: ["Location"],
      course: ["Instructors", "Description"],
      teacher: ["Disciplines", "Courses"]
    }
    return {
      titles: titles,
      teachers: [],
      courses: []
    }
  },
  computed: {
    disciplines() {
      let disciplines = new Set();
      for (let courses of this.courses) for (let discipline of courses.disciplines) disciplines.add(discipline);
      return Array.from(disciplines);
    }
  },
  methods: {
    row(name) {
      if (name === "Location" && this.matrixable.location) return `${this.matrixable.location.city}, ${this.matrixable.location.state}`;

      if (name === "Instructors") {
        return this.teachers.map(elem => {return elem.name}).join(", ");
      }
      if (name === "Description") return this.matrixable.description;

      if (name === "Disciplines") return this.disciplines.join(", ");
      if (name === "Courses") return this.courses.map(elem => {return elem.name}).join(", ");
    }
  },
  mounted() {
    if (this.type === "course") getDocumentsByIDs("teacher", this.matrixable.teachers).then(
        teachers => this.teachers = teachers
      );

    if (this.type === "teacher") getDocumentsWhere(
        "course", "teachers", "array-contains", this.matrixable.id
      ).then(
        courses => this.courses = courses
      );
  }
}
</script>

<style>
#detailsHolder {
  display: flex;
}
</style>