<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="showDrawer"
      app >
      <Drawer />
    </v-navigation-drawer>

    <Head v-on:expandDrawer="showDrawer = !showDrawer" 
      v-on:accountClicked="accountClicked()" />

    <LoginDialog />

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
import { auth } from "@/firebaseConfig"
import store from "@/store.js"

import Head from '@/components/Head'
import Drawer from '@/components/Drawer'
import LoginDialog from '@/components/Login/LoginDialog'

export default {
  components: {
    Head,
    Drawer,
    LoginDialog
  },
  data() {
    return {
      id: "G3Y85OJ0WakBVZ8tKTgJ",
      showDrawer: false,
    }
  },
  methods: {
    accountClicked() {
      // eslint-disable-next-line no-console
      // console.log(auth.currentUser);
      if (auth.currentUser && this.$route.name != 'account') this.$router.push('account');
      else if (auth.currentUser) this.$router.go();
      else this.$store.commit('SET_LOGIN_SHOWN', true);
    }
  },
  beforeMount() {
    // dbActions.setUser(this.id);
  },
  created() {
    auth.onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      // console.log(user);
      if (user) store.dispatch('loadUser', user);
    });
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
