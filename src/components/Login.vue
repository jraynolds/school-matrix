<template>
  <v-dialog v-model="showDialog" max-width="600px">
    <slot />
    <v-card>
      <v-card-title class="d-flex justify-space-around">
          <v-btn text :class="{ dimmedText: !login}" 
            @click="login = true; signup = false;">Log In</v-btn>
          <v-btn text :class="{ dimmedText: !signup}"
            @click="login = false; signup = true;">Sign Up</v-btn>
      </v-card-title>
      <v-card v-if="login">
        <v-card-text>
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
        </v-card-actions>
      </v-card>
      <v-card v-if="signup">
        <v-card-text>
          <v-container>
            <v-row>
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
export default {
  props: [ "showLogin" ],
  data() {
    return {
      login: true,
      signup: false
    }
  },
  computed: {
    showDialog: {
      get() { return this.showLogin },
      set() { this.$emit('hideDialog')}
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