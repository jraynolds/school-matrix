<template>
  <v-row class="review mx-0" :class="{ bluer: index%2 != 0 }">
    <v-col class="flex-grow-0 pr-0 image">
      <v-img v-if="user && user.avatar" 
        class="image white--text align-end" 
        height="100px" 
        width="100px"
        :src="user.avatar" >
        <v-card-title class="username justify-center pb-0">{{ user.name }}</v-card-title>
      </v-img>
      <v-img v-else-if="user" 
        class="image white--text align-end" 
        height="100px" 
        width="100px"
        src="@/assets/placeholderAvatar.png" >
        <v-card-title class="username justify-center pa-1 pb-0">{{ user.name }}</v-card-title>
      </v-img>
      <v-img v-else 
        class="image white--text align-end" 
        height="100px" 
        width="100px"
        src="@/assets/placeholderAvatar.png" >
      </v-img>
    </v-col>
    
    <v-col class="align-center d-flex">
      <v-card-subtitle class="text-left">
        <span style="font-style: italic;">{{ review.comment }}</span>
      </v-card-subtitle>
    </v-col>

    <v-col class="flex-grow-0 matrixCol">
      <Matrix :matrix="review.matrix" :isSmall="true" :type="type" style="margin-top: -50px;" />
    </v-col>
  </v-row>
</template>

<script>
import { getDocumentByID } from "@/scripts/dbActions.js"

import Matrix from '@/components/Matrix/Matrix'

export default {
  props: [ "userEmail", "index", "type", "review" ],
  components: {
    Matrix
  },
  data() {
    return {
      user: null
    }
  },
  mounted() {
    getDocumentByID("user", this.userEmail).then(user => {
      this.user = user;
    });
  }
}
</script>

<style>
.review {
  height: 124px;
}

.review > div {
  height: 124px;
}

.bluer {
  background: rgba(0, 0, 0, 0.03);
}

.username {
  font-size: 0.9em !important;
}

.reviewTitle {
  font-size: 0.9em !important;
}

.matrixCol {
  height: 124px;
  width: 210px !important;
}
</style>