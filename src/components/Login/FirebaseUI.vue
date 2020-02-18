<template>
  <v-col id="firebaseui-auth-container" />
</template>

<script>
import firebase from "firebase"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"
import dbActions from "@/scripts/dbActions.js"

export default {
  data() {
    let errorTranslations = {
      "There is no user record corresponding to this identifier. The user may have been deleted.": "No such user found.",
      "The password is invalid or the user does not have a password.": "No such user found.",
    };
    return {
      ui: new firebaseui.auth.AuthUI(firebase.auth()),
      uiConfig: {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: (authResult) => {
            this.signIn(authResult);
          }
        }
      },
      errorTranslations: errorTranslations,
      error: null
    }
  },
  methods: {
    signIn(authResult) {
      dbActions.isNewUser(authResult).then(isNew => {
        if (isNew) {
          dbActions.createNewUser(authResult).then(() => {
            this.$router.push({ path: `account` });
          });
        } else {
          this.$router.push({ path: `account` });
        }
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