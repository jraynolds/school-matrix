<template>
  <v-app-bar
    color="indigo"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('expandDrawer')" />
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    <v-spacer />
    <v-tooltip bottom v-for="(item, index) of items" :key="item.icon">
      <template v-slot:activator="{ on }">
        <v-btn icon :disabled="isDisabled(index)" v-on="on">
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
        </v-btn>
      </template>
      <span>{{ item.alt }}</span>
    </v-tooltip>
    </v-app-bar>
</template>

<script>

export default {
  data() {
    let items = [
      { alt: "Search for schools", icon: "school-outline" },
      { alt: "Search for courses", icon: "google-classroom" },
      { alt: "Search for teachers", icon: "teach" },
      { alt: "See your recommendations", icon: "hexagon-slice-6" }
    ]
    return {
      items: items
    }
  },
  methods: {
    isDisabled(index) {
      if (index === 3 && !this.$store.getters.isLoggedIn) return true;
      return false;
    }
  }
}
</script>

<style>

</style>