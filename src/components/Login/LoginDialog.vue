<template>
  <v-dialog v-model="showDialog" eager max-width="600px">
    <v-card>
      <slot />
      <v-card color="primary">
        <v-card-title class="d-flex justify-space-around">
            <v-btn text color="white" :class="{ dimmedText: !login}" 
              @click="login = true; signup = false;">Log In</v-btn>
            <v-btn text color="white" :class="{ dimmedText: !login}"
              @click="login = false; signup = true;">Sign Up</v-btn>
        </v-card-title>
      </v-card>
      <Login v-show="login" />
      <Signup v-show="!login" />
      <FirebaseUI />
    </v-card>
  </v-dialog>
</template>

<script>
import Login from "@/components/Login/Login"
import Signup from "@/components/Login/Signup"
import FirebaseUI from "@/components/Login/FirebaseUI"

export default {
  components: {
    Login,
    Signup,
    FirebaseUI
  },
  data() {
    return {
      login: true,
    }
  },
  computed: {
    showDialog: {
      get() { return this.$store.getters.getLoginShown },
      set(value) { this.$store.commit('SET_LOGIN_SHOWN', value) }
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