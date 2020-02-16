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
        <v-col class="justify-center">
          <v-text-field label="name" v-model="name" :loading="name == ''" />
        </v-col>
        <v-col>
          <v-text-field label="email" 
            v-model="email" 
            :rules="[ rules.email ]" 
            :loading="email == ''" />
        </v-col>
        <v-col>
          <v-text-field label="school" 
            v-model="school" 
            :loading="school == ''" />
        </v-col>
        <v-col>
          <v-btn :disabled="!userInfoChanged">Update</v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Model (Chosen)</h1>
        <ModelViewer :matrices="aggregateMatrices" :tabs="['Teachers', 'Classes', 'Schools']" />
        <v-btn class="mt-2">Change preferred models</v-btn>
      </v-col>
      <v-col>
        <h1>Model (Aggregate)</h1>
        <h3><i></i></h3>
        <ModelViewer :matrices="matrices" :tabs="['Teachers', 'Classes', 'Schools']" />
        <v-btn class="mt-2">See your reviews</v-btn>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
// import { auth } from "@/firebaseConfig"

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
      }
    };
    return {
      inputFields: {
        name: '',
        email: '',
        school: ''
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
        return this.$store.getters.getUser.school.name;
      },
      set: function(newVal) {
        this.inputFields.school = newVal;
      }
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
      let aggregates = { 
        teacher: {
          Approachable: 3,
          Innovative: 3,
          Inspirational: 3,
          Instructive: 3,
          Skillful: 3,
          Strict: 3
        }, course: {
          Experimental: 3,
          "Fast-paced": 6,
          "Hands-on": 3,
          Lecturing: 3,
          Relevant: 3,
          "Student-led": 3
        }, school: {
          Accommodating: 3,
          Demanding: 3,
          Grounds: 3,
          Progressive: 3,
          Resources: 3,
          Transparent: 3
        }
      };

// eslint-disable-next-line no-console
      console.log(aggregates);

      let reviews = this.$store.getters.getUserReviews;

// eslint-disable-next-line no-console
      console.log(reviews);

      if (reviews.teacher.length > 0) aggregates.teacher = this.getAverageScores(aggregates.teacher, reviews.teacher);
// eslint-disable-next-line no-console
      console.log(reviews.course);
      if (reviews.course.length > 0) aggregates.course = this.getAverageScores(aggregates.course, reviews.course);
      if (reviews.teacher.school > 0) aggregates.school = this.getAverageScores(aggregates.school, reviews.school);

// eslint-disable-next-line no-console
      console.log(aggregates);

      return aggregates;
    }
  },
  methods: {
    getAverageScores(matrix, reviews) {
      for (let key in matrix) matrix[key] = 0;
      let i=0;
// eslint-disable-next-line no-console
        console.log(reviews);
      for (i=0; i<reviews.length; i++) {
// eslint-disable-next-line no-console
        console.log(reviews[i]);
        for (let key in matrix) {
          matrix[key] += reviews[i].matrix[key];
        }
      }
      for (let key in matrix) matrix[key] /= (i + 1);
// eslint-disable-next-line no-console
        console.log(matrix);
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