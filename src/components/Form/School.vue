<template>
  <v-autocomplete label="school" 
    v-model="school" 
    :loading="school == 'loading...'"
    :items="dbActions.getAllSchools()" />
</template>

<script>
import dbActions from "@/scripts/dbActions.js"

export default {
  data() {
    return {
      selectedSchool = "loading"
    }
  },
  computed: {
    school: {
      get() {

      },
      set(newVal) {
        this.$emit("schoolChanged")
      }
    }
  }
}
</script>

<style>

</style>