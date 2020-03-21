<template>
  <v-app id="app">
    <v-navigation-drawer app
      temporary
      v-model="showDrawer" >
      <Drawer />
    </v-navigation-drawer>

    <Head v-on:expandDrawer="showDrawer = !showDrawer" 
      v-on:accountClicked="accountClicked()" />

    <LoginDialog />

    <ReviewDialog :reviewItem="reviewItem" :type="reviewType" />

    <router-view class="pb-12" v-on:reviewing="reviewing" />
        
    <v-footer absolute
      color="indigo" >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { auth } from "@/firebaseConfig"

import Head from '@/components/Head'
import Drawer from '@/components/Drawer'
import LoginDialog from '@/components/Login/LoginDialog'
import ReviewDialog from '@/components/Review/ReviewDialog'

export default {
  components: {
    Head,
    Drawer,
    LoginDialog,
    ReviewDialog
  },
  data() {
    return {
      id: "G3Y85OJ0WakBVZ8tKTgJ",
      showDrawer: false,
      reviewItem: {},
      reviewType: ""
    }
  },
  methods: {
    accountClicked() {
      if (auth.currentUser && this.$route.name != 'account') this.$router.push('account');
      else if (auth.currentUser) this.$router.go();
      else this.$store.commit('SET_LOGIN_SHOWN', true);
    },
    reviewing(matrixable, type) {
      this.reviewItem = matrixable;
      this.reviewType = type;
    }
  },
  created() {
    auth.onAuthStateChanged(() => {
      // if (user) this.$store.dispatch('loadUser', user);
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
