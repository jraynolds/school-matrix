<template>
  <div v-if="user.email" class="card horizontal" style="max-width:400px;margin:0 auto;">
    <div class="card-image" style="margin-top:25px;margin-left:10px;"> 
      <img :src="user.photoURL" style="width:75px;height:75px;border-radius:50%;border:4px solid #333" /> 
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <p> name: <strong>{{user.displayName}}</strong><br />email:<strong>{{user.email}}</strong><br/>uid:
          <strong>{{user.uid}}</strong> <br />provider: <strong
                    class="teal-text">{{user.providerID}}</strong> 
        </p>
      </div>
    </div>
  </div>

  <!-- <v-container
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
          <v-text-field label="school" v-model="inputFields.schoolname" />
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
  </v-container> -->
</template>

<script>
// import ModelViewer from '@/components/ModelViewer'
import firebase from "firebase"

export default {
  name: 'account',
  components: {
    // ModelViewer
  },
  data() {
    return {
      // inputFields: {
      //   name: this.$store.getters.getUser.name,
      //   email: this.$store.getters.getUser.email,
      //   schoolname: this.$store.getters.getUserSchool.name
      // }
      user: {
        email: null,
        photoURL: null,
        displayName: null,
        uid: null,
        providerID: null
      }
    }
  },
  computed: {
  //   user() {
  //     return this.$store.getters.getUser;
  //   },
  //   aggregateMatrices() {
  //     let allReviews = this.$store.getters.getUserReviews;
  //     let matrices = {};
  //     for (let key in allReviews) {
  //       let matrix = {};
  //       let reviews = allReviews[key];
  //       if (reviews.length != 0) {
  //         for (let kkey in reviews[0].matrix) matrix[kkey] = 0;
  //         let i=0;
  //         for (i=0; i<reviews.length; i++) {
  //           for (let kkey in reviews[i].matrix) matrix[kkey] += reviews[i].matrix[kkey];
  //         }
  //         for (let kkey in matrix) matrix[kkey] /= i;
  //       }
  //       matrices[key] = matrix;
  //     }
  //     return matrices;
  //   },
  //   userInfoChanged() {
  //     if (this.inputFields.name == "" || this.inputFields.email == "" || this.inputFields.schoolname == "") return false;
  //     if (this.inputFields.name == this.$store.getters.getUser.name && this.inputFields.email == this.$store.getters.getUser.email && this.inputFields.schoolname == this.$store.getters.getUserSchool.name) return false;
  //     return true;
  //   },
  },
  methods: {
    // updateUser(user, school) {
    //   this.inputFields.name = user.name;
    //   this.inputFields.email = user.email;
    //   this.inputFields.schoolname = school.name;
    // }
  },
  created() {
    // let vm = this;

    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === 'setUserSchool') {
    //     vm.updateUser(state.user, state.userSchool);
    //   }
    // })
    firebase.auth().onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      console.log(user);
      // eslint-disable-next-line no-console
      console.log(this.user);
      if (user) {
        this.user.email = user.email;
        this.user.photoURL = user.photoURL;
        this.user.displayName = user.displayName;
        this.user.uid = user.uid;
        this.user.providerID = user.providerData[0].providerId;
      }
      // eslint-disable-next-line no-console
      console.log(this.user);
    });
  },
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