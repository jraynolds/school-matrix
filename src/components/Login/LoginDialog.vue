<template>
  <v-dialog v-model="showDialog" eager max-width="600px">
    <slot />
    <v-card>
      <v-card-title class="d-flex justify-space-around">
          <v-btn text :class="{ dimmedText: !login}" 
            @click="login = true; signup = false;">Log In</v-btn>
          <v-btn text :class="{ dimmedText: !signup}"
            @click="login = false; signup = true;">Sign Up</v-btn>
      </v-card-title>
      <Login v-if="login" />
      <Signup v-if="signup" />
    </v-card>
  </v-dialog>
</template>

<script>
import Login from "@/components/Login/Login"
import Signup from "@/components/Login/Signup"

export default {
  components: {
    Login,
    Signup
  },
  data() {
    return {
      login: true,
      signup: false,
    }
  },
  computed: {
    showDialog: {
      get() { return this.$store.getters.getLoginShown },
      set(value) { this.$store.commit('SET_LOGIN_SHOWN', value) }
    },
    signupReady() {
      return false;
    },
    loginReady() {
      // return (this.loginForm.email.includes(@))
      return false;
    }
  },
  methods: {
    userSignup() {

    },
    userLogin() {

    }
  },
}
</script>

<style>
.dimmedText {
  transition: opacity 1s;
  opacity: 0.5 !important;
}

.dimmedText:hover {
  opacity: 1 !important;
}
</style>