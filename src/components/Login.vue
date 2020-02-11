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
      <v-col id="firebaseui-auth-container" />
      <v-card v-if="login">
        <!-- <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email" required />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password" type="password" required />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text>Forgot Password</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" :disabled="!loginReady" @click="userLogin()">Log in</v-btn>
        </v-card-actions> -->
      </v-card>
      <v-card v-if="signup">
        <v-card-text>
          <v-container>
            <v-row class="mt-n6">
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="First name*" required />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal last name*" />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" hint="valid .edu domain preferred." persistent-hint required />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Current place of schooling*" required />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" required />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Confirm password*" type="password" required />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" :disabled="!signupReady" @click="userSignup()">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"

export default {
  props: [ "showLogin" ],
  data() {
    let uiConfig = {
      signInSuccessUrl: "/account",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ]
    };
    return {
      showMeAlways: true, // For testing
      login: true,
      signup: false,
      ui: new firebaseui.auth.AuthUI(firebase.auth()),
      uiConfig: uiConfig,
      dialogShownBefore: false
    }
  },
  computed: {
    showDialog: {
      get() { return this.showLogin },
      set() { this.$emit('hideDialog') }
    },
    signupReady() {
      return false;
    },
    loginReady() {
      return false;
    }
  },
  methods: {
    userSignup() {

    },
    userLogin() {

    }
  },
  watch: {
    login(newVal) {
      if (newVal == true) document.getElementById("firebaseui-auth-container").style.display = "block";
      else document.getElementById("firebaseui-auth-container").style.display = "none";
    }
  },
  mounted() {
    this.ui.start("#firebaseui-auth-container", this.uiConfig);
  }
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