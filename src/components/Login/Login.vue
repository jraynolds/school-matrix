<template>
  <div id="login">
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
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
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
          vm.$store.dispatch('setLoginShown', false);
          // vm.$store.dispatch('setUser', user);
          vm.$router.push({ path: "account" });
        })
        .catch(err => {
          vm.failedOn.email = vm.email;
          vm.failedOn.password = vm.password;
          if (vm.errorTranslations[err.message]) vm.error = vm.errorTranslations[err.message];
        });
    }
  }
}
</script>

<style>

</style>