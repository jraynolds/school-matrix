<template>
  <v-list dense>

    <v-list-item link to="/">
      <v-list-item-action>
        <v-icon>mdi-home</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link to="/account" :disabled="!isLoggedIn" >
      <v-list-item-action>
        <v-icon>mdi-account</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Account</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item link :disabled="!isLoggedIn" @click="logout()" >
      <v-list-item-action>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-list>
</template>

<script>
import { auth } from "@/firebaseConfig.js"

export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.getUser.name != '';
    }
  },
  methods: {
    logout() {
      auth.signOut();
      if (this.$route.name == "home") this.$router.go();
      else this.$router.push({ name: "home" });
    }
  }
}
</script>

<style>
.v-navigation-drawer--fixed {
  z-index: 10 !important;
}
</style>