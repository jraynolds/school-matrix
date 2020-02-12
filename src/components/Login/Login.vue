<template>
  <v-card id="login">
    <v-card-text>
      <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Email" 
                required 
                v-model="email"
                type="email" 
                @keyup.enter="tryLogin()" />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password"
                type="password" 
                required 
                v-model="password" 
                @keyup.enter="tryLogin()" />
            </v-col>
            <v-col class="py-0 my-n5">
              <v-alert type="error" v-if="showError" class="pa-1">{{ error }}</v-alert>
            </v-col>
          </v-row>
        <v-col id="firebaseui-auth-container" />
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue darken-1" text>Forgot Password</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" 
        :disabled="!loginValid" 
        @click="login()"
        type="submit">Log in</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"

export default {
  data() {
    let uiConfig = {
      signInSuccessUrl: "/account",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    let errorTranslations = {
      "There is no user record corresponding to this identifier. The user may have been deleted.": "No such user found.",
      "The password is invalid or the user does not have a password.": "No such user found.",
    };
    return {
      ui: new firebaseui.auth.AuthUI(firebase.auth()),
      uiConfig: uiConfig,
      errorTranslations: errorTranslations,
      email: "",
      password: "",
      error: null,
      failedOn: {
        email: "",
        password: ""
      }
    }
  },
  computed: {
    loginValid() {
      if (this.email == "" || this.password == "") return false;
      let emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(this.email)) return false;
      return true;
    },
    showError() {
      return (
        this.error 
        && this.failedOn.email == this.email 
        && this.failedOn.password == this.password
      );
    }
  },
  methods: {
    tryLogin() {
      if (this.loginValid) this.login();
      return;
    },
    login() {
      let vm = this;

      firebase
        .auth()
        .signInWithEmailAndPassword(vm.email, vm.password)
        .then(function() {
          vm.$store.commit('SET_LOGIN_SHOWN', false);
          vm.$router.push({ path: "account" });
        })
        .catch(err => {
          vm.failedOn.email = vm.email;
          vm.failedOn.password = vm.password;
          if (vm.errorTranslations[err.message]) vm.error = vm.errorTranslations[err.message];
        });
    }
  },
  mounted() {
    this.ui.start("#firebaseui-auth-container", this.uiConfig);
  }
}
</script>

<style>

</style>