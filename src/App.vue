<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="showDrawer"
      app >
      <Drawer />
    </v-navigation-drawer>

    <Head v-on:expandDrawer="showDrawer = !showDrawer" 
      v-on:accountClicked="accountClicked()" />

    <Login :showLogin="showLogin" 
      v-on:hideDialog="showLogin = false" />

    <router-view>
    </router-view>
        
    <v-footer
      color="indigo"
      app >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
// import dbActions from '@/scripts/dbActions.js'

import Head from '@/components/Head'
import Drawer from '@/components/Drawer'
import Login from '@/components/Login'

export default {
  components: {
    Head,
    Drawer,
    Login
  },
  data() {
    return {
      id: "G3Y85OJ0WakBVZ8tKTgJ",
      showDrawer: false,
      showLogin: false,
    }
  },
  methods: {
    accountClicked() {
      if (this.$store.getters.userLoggedIn && this.$route.name != 'account') this.$router.push('account');
      else if (this.userLoggedIn) this.$router.go();
      else this.showLogin = true;
    }
  },
  beforeMount() {
    // dbActions.setUser(this.id);
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
