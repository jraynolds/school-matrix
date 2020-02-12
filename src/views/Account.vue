<template>
  <div v-if="user" class="card horizontal" style="max-width:400px;margin:0 auto;">
    <div class="mt-12 pt-12">{{ user.displayName }}</div>
    <!-- <div class="card-image" style="margin-top:25px;margin-left:10px;"> 
      <img :src="photoURL" style="width:75px;height:75px;border-radius:50%;border:4px solid #333" /> 
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <p> name: <strong>{{displayName}}</strong><br />email:<strong>{{email}}</strong><br/>uid:
          <strong>{{uid}}</strong> <br />provider: <strong
                    class="teal-text">{{providerID}}</strong> 
        </p>
      </div>
    </div> -->
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
      user: null
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
  watch: {
    user() {
      // eslint-disable-next-line no-console
      console.log("user updated");
    },
    email(newval, oldval) {
      // eslint-disable-next-line no-console
      console.log("email updated");
      // eslint-disable-next-line no-console
      console.log(newval);
      // eslint-disable-next-line no-console
      console.log(oldval);
      // eslint-disable-next-line no-console
      console.log(this.displayAccount);
      // this.doShow = true;
      this.testKey++;

      this.$nextTick(() => {
        // eslint-disable-next-line no-console
        console.log("this is the next tick.");
        this.doShow = true;
        this.testKey++;
        this.$forceUpdate();
      });
    }
  },
  methods: {
    // updateUser(user, school) {
    //   this.inputFields.name = user.name;
    //   this.inputFields.email = user.email;
    //   this.inputFields.schoolname = school.name;
    // }
  },
  mounted() {
    let vm = this;

    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === 'setUserSchool') {
    //     vm.updateUser(state.user, state.userSchool);
    //   }
    // })
    firebase.auth().onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      console.log(user);
      // eslint-disable-next-line no-console
      console.log(vm.user);
      if (user) {
        vm.user = {
          // email: user.email,
          // photoURL: user.photoURL,
          displayName: user.displayName,
          // uid: user.uid,
          // providerID: user.providerData[0].providerID
        };
        // vm.$set(vm.user.email, "email", user.email);
        // vm.$set(vm.user.photoURL, "email", user.photoURL);
        // vm.$set(vm.user.displayName, "email", user.displayName);
        // vm.$set(vm.user.uid, "email", user.uid);
        // vm.$set(vm.user.providerID, "email", user.providerData[0].providerId);
      }
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