<template>
  <v-container
    class="fill-height pt-10"
    fluid 
    v-if="$store.getters.getUser.name">
    <v-row>
      <v-col class="d-flex align-center flex-grow-0">
        <v-img src="../assets/placeholderAvatar.png" class="text-bottom align-end" width="200">
          <v-btn id="uploadAvatar" color="primary">Upload Image</v-btn>
        </v-img>
      </v-col>
      <v-col>
        <v-row>
          <v-col sm="5">
            <v-text-field label="name" v-model="name" :loading="name == ''" />
          </v-col>
          <v-col sm="7">
            <v-text-field label="email" 
              v-model="email" 
              :rules="[ rules.email ]" 
              :loading="email == ''" />
          </v-col>
          <v-col sm="6">
            <v-text-field label="school" 
              v-model="school" 
              :loading="school == 'loading...'" />
          </v-col>
          <v-col sm="6">
          </v-col>
          <v-col sm="4">
            <v-text-field label="new password" 
              v-model="inputFields.passwords.new"
              :rules="[rules.password]" 
              :append-icon="newShowPassword"
              :type="showPasswords.new ? 'text' : 'password'"
              :counter="inputFields.passwords.new.length < 8 ? 8 : false"
              @click:append="showPasswords.new = !showPasswords.new" />
          </v-col>
          <v-slide-x-transition>
            <v-row cols="8" v-show="inputFields.passwords.new.length > 0" >
              <v-col sm="6">
                <v-text-field label="confirm new password" 
                  v-model="inputFields.passwords.confirm"
                  :rules="[rules.confirmPassword]" 
                  :append-icon="confirmShowPassword"
                  :type="showPasswords.confirm ? 'text' : 'password'"
                  @click:append="showPasswords.confirm = !showPasswords.confirm" />
              </v-col>
              <v-col sm="6">
                <v-text-field label="old password" 
                  v-model="inputFields.passwords.old"
                  :append-icon="oldShowPassword"
                  :type="showPasswords.old ? 'text' : 'password'"
                  @click:append="showPasswords.old = !showPasswords.old" />
              </v-col>
            </v-row>
          </v-slide-x-transition>
          <v-col cols="12">
            <v-btn :disabled="!userInfoChanged">Update</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Model (Chosen)</h1>
        <ModelViewer :matrices="matrices" :tabs="['Teachers', 'Classes', 'Schools']" />
        <v-btn class="mt-2">Change preferred models</v-btn>
      </v-col>
      <v-col>
        <h1>Model (Aggregate)</h1>
        <h3><i></i></h3>
        <ModelViewer :matrices="aggregateMatrices" :tabs="['Teachers', 'Classes', 'Schools']" />
        <v-btn class="mt-2">See your reviews</v-btn>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import { getDefaultMatrixSet } from '@/components/Matrix/matrices.js'

import ModelViewer from '@/components/ModelViewer'

export default {
  name: 'account',
  components: {
    ModelViewer
  },
  data() {
    let rules = {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
      password: value => {
        return value.length > 7;
      },
      confirmPassword: value => {
        return value == this.inputFields.passwords.new || 'Must be the same as the first password.';
      }
    };
    return {
      inputFields: {
        name: '',
        email: '',
        school: 'loading...',
        passwords: {
          new: '',
          confirm: '',
          old: ''
        },
      },
      showPasswords: {
        new: false,
        confirm: false,
        old: false
      },
      rules: rules
    }
  },
  computed: {
    name: {
      get: function() {
        return this.$store.getters.getUser.name;
      },
      set: function(newVal) {
        this.inputFields.name = newVal;
      }
    },
    email: {
      get: function() {
        return this.$store.getters.getUser.email;
      },
      set: function(newVal) {
        this.inputFields.email = newVal;
      }
    },
    school: {
      get: function() {
        let school = this.$store.getters.getUser.school;
        if (school.name == "") return "";
        return `${school.name}, ${school.location.city} ${school.location.state.slice(0, 2).toUpperCase()}`;
      },
      set: function(newVal) {
        this.inputFields.school = newVal;
      }
    },
    newShowPassword() {
      if (this.inputFields.passwords.new.length < 1) return '';
      else if(!this.showPasswords.new) return "mdi-eye-off";
      return "mdi-eye";
    },
    confirmShowPassword() {
      if (this.inputFields.passwords.confirm.length < 1) return '';
      else if(!this.showPasswords.confirm) return "mdi-eye-off";
      return "mdi-eye";
    },
    oldShowPassword() {
      if (this.inputFields.passwords.old.length < 1) return '';
      else if(!this.showPasswords.old) return "mdi-eye-off";
      return "mdi-eye";
    },
    matrices() {
      return this.$store.getters.getUser.matrices;
    },
    userInfoChanged() {
      if (this.inputFields.name == '' && this.inputFields.email == '' && this.inputFields.school == '') return false;
      if (this.inputFields.email != '' && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.inputFields.email) == false) return false;
      if ((this.inputFields.name == '' || this.inputFields.name == this.name) && (this.inputFields.email == '' || this.inputFields.email == this.email) && (this.inputFields.school == '' || this.inputFields.school == this.school)) return false;
      return true;
    },
    aggregateMatrices() {
      let aggregates = getDefaultMatrixSet();
      let reviews = this.$store.getters.getUserReviews;
      if (reviews.teacher.length > 0) aggregates.teacher = this.getAverageScores(aggregates.teacher, reviews.teacher);
      if (reviews.course.length > 0) aggregates.course = this.getAverageScores(aggregates.course, reviews.course);
      if (reviews.teacher.school > 0) aggregates.school = this.getAverageScores(aggregates.school, reviews.school);

      return aggregates;
    }
  },
  methods: {
    getAverageScores(matrix, reviews) {
      for (let key in matrix) matrix[key] = 0;
      let i=0;
      for (i=0; i<reviews.length; i++) {
        for (let key in matrix) {
          matrix[key] += reviews[i].matrix[key];
        }
      }
      for (let key in matrix) matrix[key] /= (i + 1);
      return matrix;
    }
  }
}
</script>

<style>
#uploadAvatar {
  opacity: 0.5;
  transition: opacity 1s;
}

#uploadAvatar:hover {
  opacity: 1.0;
}
</style>