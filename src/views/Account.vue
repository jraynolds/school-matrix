<template>
  <v-container
    class="fill-height pt-10"
    fluid 
    v-if="user">
    <v-row>
      <v-col class="d-flex align-center flex-grow-0">
        <v-img src="../assets/placeholderAvatar.png" class="text-bottom align-end" width="200">
          <v-btn id="uploadAvatar" color="primary">Upload Image</v-btn>
        </v-img>
      </v-col>
      <v-col>
        <v-col class="justify-center">
          <v-text-field label="name" v-model="inputFields.name" />
        </v-col>
        <v-col>
          <v-text-field label="email" v-model="inputFields.email" />
        </v-col>
        <v-col>
          <v-text-field label="school" v-model="inputFields.school.name" />
        </v-col>
        <v-col>
          <v-btn :disabled="!userInfoChanged">Update</v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Model (Chosen)</h1>
        <ModelViewer :matrices="user.matrices" :tabs="['Teachers', 'Classes', 'Schools']" />
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
import ModelViewer from '@/components/ModelViewer'

export default {
  name: 'account',
  components: {
    ModelViewer
  },
  data() {
    return {
      inputFields: {
        name: "",
        email: "",
        school: { name: "" }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    aggregateMatrices() {
      let allReviews = this.$store.getters.getUserReviews;
      let matrices = {};
      for (let key in allReviews) {
        let matrix = {};
        let reviews = allReviews[key];
        if (reviews.length != 0) {
          for (let kkey in reviews[0].matrix) matrix[kkey] = 0;
          let i=0;
          for (i=0; i<reviews.length; i++) {
            for (let kkey in reviews[i].matrix) matrix[kkey] += reviews[i].matrix[kkey];
          }
          for (let kkey in matrix) matrix[kkey] /= i;
        }
        matrices[key] = matrix;
      }

      return matrices;
    },
    userInfoChanged() {
      return this.inputFields.name != "" && this.inputFields.name != this.$store.getters.getUser.name && this.inputFields.email != "" && this.inputFields.email != this.$store.getters.getUser.email && this.inputFields.school.name != "" && this.inputFields.school.name != this.$store.getters.getUser.school.name;
    }
  },
  mounted() {
    this.inputFields.name = this.$store.getters.getUser.name;
    this.inputFields.email = this.$store.getters.getUser.email;
    // this.inputFields.school = this.$store.getters.getUserSchool;
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