<template>
  <v-app-bar
    app
    color="indigo"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('expandDrawer')" />
    <v-toolbar-title>University of Puget Sound / Teachers</v-toolbar-title>
    <v-spacer />
    <v-icon >mdi-account</v-icon>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>