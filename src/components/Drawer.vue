<template>
  <div>
    <v-list-item v-if="$store.getters.isLoggedIn">
      <v-list-item-avatar>
        <v-img src="https://i.imgur.com/C5tSvb.png" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-left">
          {{ $store.getters.user.name }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" style="min-width: 0px;" @click="logout()" v-on="on">
              <v-icon v-text="'mdi-logout'" />
            </v-btn>
          </template>
          <span>Log out</span>
        </v-tooltip>
      </v-list-item-icon>
    </v-list-item>

    <v-list-item v-else>
      <v-list-item-icon>
        <v-icon large>mdi-account</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="text-left">
          No user.
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" style="min-width: 0px;" @click="$store.commit('set_login_dialog_shown', true)" v-on="on">
              <v-icon v-text="'mdi-login'" />
            </v-btn>
          </template>
          <span>Log in</span>
        </v-tooltip>
      </v-list-item-icon>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item :to="item.link" v-for="item of items" :key="item.title">
        <v-list-item-icon>
          <v-icon v-text="`mdi-${item.icon}`" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-left">
            {{ `Your ${item.title}` }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
// import { auth } from "@/firebaseConfig.js"

export default {
  data() {
    let items = [
      { title: "account", icon: "account", link: "/account" },
      { title: "models", icon: "hexagon-multiple-outline", link: "/models" },
      { title: "reviews", icon: "comment-text-outline", link: "/reviews" },
      { title: "recommendations", icon: "hexagon-slice-6" },
    ]
    return { 
      items: items
    }
  },
  methods: {
    logout() {
			// auth.signOut();
			this.$store.dispatch('logout');
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