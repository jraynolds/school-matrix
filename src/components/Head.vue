<template>
  <v-app-bar
    app
    color="indigo"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('expandDrawer')" />
    <v-toolbar-title>University of Puget Sound / Teachers</v-toolbar-title>
    <v-spacer />
    <v-btn text @click="$emit('accountClicked')"><v-icon >mdi-account</v-icon></v-btn>
    </v-app-bar>
</template>

<script>

export default {
}
</script>

<style>

</style>