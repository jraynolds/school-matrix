<template>
  <div>
    <v-card-text class="pb-0">
      <v-container>
        <v-row class="mt-n6">
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Name*" 
              required v-model="name" 
              :rules="[rules.name]"
              :counter="name.length < 3 ? 3 : false" />
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field label="Email*" 
              hint="valid .edu domain preferred." 
              persistent-hint 
              required 
              v-model="email"
              :rules="[rules.email]" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Current place of schooling"  
              v-model="school" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Password*" 
              v-model="password"
              :rules="[rules.password]" 
              :append-icon="showPasswordIcon"
              :type="showPasswordText ? 'text' : 'password'"
              :counter="password.length < 8 ? 8 : false"
              @click:append="showPasswordText = !showPasswordText" />
          </v-col>
          <v-slide-y-transition>
            <v-col cols="12" md="6" v-show="password.length > 0">
              <v-text-field label="Confirm password*" 
                v-model="passwordConfirm"
                :rules="[rules.passwordConfirm]" 
                :append-icon="showPasswordConfirmIcon"
                :type="showPasswordText ? 'text' : 'password'"
                @click:append="showPasswordConfirmText = !showPasswordConfirmText" />
            </v-col>
          </v-slide-y-transition>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-card-text class="d-flex"><small>*indicates required field</small></v-card-text>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" 
        :disabled="!signupValid" 
        @click="userSignup()">Sign Up</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { auth, userCollection } from '@/firebaseConfig.js'
import { getDefaultMatrixSet } from '@/components/Matrix/matrices.js'

export default {
  data() {
    let rules = {
      name: value => {
        return value.length >= 3;
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
      password: value => {
        return value.length > 7;
      },
      passwordConfirm: value => {
        return value == this.password || 'Must be the same as the first password.';
      }
    };
    return {
      name: "",
      school: "",
      email: "",
      password: "",
      passwordConfirm: "",
      showPasswordText: false,
      showPasswordConfirmText: false,
      rules: rules
    }
  },
  computed: {
    showPasswordIcon() {
      if (this.password.length < 1) return '';
      else if(!this.showPasswordText) return "mdi-eye-off";
      return "mdi-eye";
    },
    showPasswordConfirmIcon() {
      if (this.passwordConfirm.length < 1) return '';
      else if(!this.showPasswordConfirmText) return "mdi-eye-off";
      return "mdi-eye";
    },
    signupValid() {
      if (this.name.length < 3) return false;
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email) == false) return false;
      if (this.email == "") return false;
      if (this.password.length < 8) return false;
      if (this.passwordConfirm != this.password) return false;
      return true;
    }
  },
  methods: {
    signup() {
      let vm = this;

      auth.createUserWithEmailAndPassword(this.email, this.password).then(function() {
        userCollection.push({
          name: vm.name,
          school: vm.school,
          matrices: getDefaultMatrixSet()
        });
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);

      });
    }
  }
}
</script>

<style>

</style>