<template>
  <v-row class="rating mx-0" :class="{ bluer: index%2 == 0 }">
    <v-col class="flex-grow-0 pr-0 image">
      <v-img class="image white--text align-end" 
        height="100px" 
        width="100px"
        :src="user.avatar" >
        <v-card-title class="username justify-center pb-0">{{ user.username }}</v-card-title>
      </v-img>
    </v-col>
    
    <v-col>
      <v-card-title class="px-0 pt-0">
        <span class="reviewTitle pt-4">Review:</span>
      </v-card-title>
      <v-card-subtitle class="text-left">
        <span style="font-style: italic;">{{ review.writeup }}</span>
      </v-card-subtitle>
    </v-col>

    <v-col class="flex-grow-0 matrixCol">
      <Matrix :matrix="review.matrix" :isSmall="true" :type="type" style="margin-top: -50px;" />
    </v-col>
  </v-row>
</template>

<script>
import Matrix from '@/components/Matrix/Matrix'

export default {
  props: [ "user", "index", "type", "review" ],
  components: {
    Matrix
  }
}
</script>

<style>
.rating {
  height: 124px;
}

.rating > div {
  height: 124px;
}

.bluer {
  background-color: rgba(0,155,255,0.1);
}

.username {
  font-size: 0.5em !important;
}

.reviewTitle {
  font-size: 0.9em !important;
}

.matrixCol {
  height: 124px;
  width: 210px !important;
}
</style>