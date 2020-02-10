<template>
  <v-container
    v-if="user"
    class="fill-height"
    fluid >
    <v-row>
      <v-col class="d-flex align-center flex-grow-0">
        <v-img src="../assets/placeholderAvatar.png" class="text-bottom align-end" width="200">
          <v-btn id="uploadAvatar" color="primary">Upload Image</v-btn>
        </v-img>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field label="First" v-model="user.firstname" />
          </v-col>
          <v-col>
            <v-text-field label="Last" v-model="user.lastname" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="email" v-model="user.email" />
          </v-col>
          <v-col>
            <v-btn :disabled="!userInfoChanged">Update</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Model (Aggregate)</h1>
        <h3><i></i></h3>
        <ModelViewer :matrixes="userMatrices" :tabs="['Teachers', 'Classes', 'Schools']" />
        <v-btn class="mt-2">See your reviews</v-btn>
      </v-col>
      <v-col>
        <h1>Model (Chosen)</h1>
        <ModelViewer :matrixes="userMatrices" :tabs="['Teachers', 'Classes', 'Schools']" />
        <v-btn class="mt-2">Change preferred models</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModelViewer from '@/components/ModelViewer'
// const fb = require('@/firebaseConfig.js');
import dbActions from '@/scripts/dbActions.js'

export default {
  name: 'account',
  components: {
    ModelViewer
  },
  data() {
    return {
      id: "G3Y85OJ0WakBVZ8tKTgJ",
      user: null
    }
  },
  computed: {
    userInfoChanged() {
      return false;
    }
  },
  beforeMount() {
    // eslint-disable-next-line no-console
    // console.log(dbActions.getUser(this.id));
    // this.user = dbActions.getUser(this.id);
    dbActions.getUser(this.id).then(function(user) {
      this.user = user;
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