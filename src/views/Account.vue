<template>
  <div v-if="user" class="card horizontal" style="max-width:400px;margin:0 auto;">
    <div class="mt-12 pt-12">{{ user.uid }}</div>
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
      user: null
    }
  },
  created() {
    let vm = this;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        vm.user = user;
      }
    });
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