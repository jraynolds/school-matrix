<template>
  <v-card class="card pa-1 px-3" 
    :class="{collapsed: isCollapsed, collapsible: isCollapsible && !isCollapsed, expandable: isCollapsed}"
    v-on="isCollapsible ? { click: () => isCollapsed = !isCollapsed } : {}"
    style="width: 750px;" >

    <v-row class="pa-0 ma-0">
      <v-col class="pa-0 ma-0">
        <v-card-title class="pa-0 ma-0">{{ matrixable.name }}</v-card-title>
      </v-col>

      <v-col class="pa-0 ma-0 align-center d-flex">
        <v-card-subtitle class="pa-0 ma-0 font-italic" v-if="type === 'school' && matrixable.focuses">
          {{ matrixable.focuses.join(", ") }}
        </v-card-subtitle>
        <v-card-subtitle class="pa-0 ma-0 font-italic" v-else-if="type === 'course' && matrixable.disciplines">
          {{ matrixable.disciplines.join(", ") }}
        </v-card-subtitle>
      </v-col>

      <v-col class="flex-grow-0 pa-0 ma-0">
        <v-card-title class="align-end pa-0 ma-0" 
          style="word-break: normal; font-style: italic;" >
          MATCH
        </v-card-title>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="flex-grow-0 pl-3 image">
        <v-img class="white--text" 
          :class="align" 
          height="200px" 
          width="200px"
          :src="image" >
        </v-img>
      </v-col>

      <Details class="pr-8"
        :type="type" 
        :matrixable="matrixable" />

      <v-col class="flex-grow-0 pl-0" >
        <Matrix v-if="matrixable.matrix" :matrix="matrixable.matrix" :type="type" />
      </v-col>
    </v-row>

    <v-card-actions class="justify-center pa-0 mt-n3 mb-n3" 
      style="height: 20px; z-index: 10;" >
      <v-btn depressed v-if="matrixable.hasReviews"
        @click.stop="reviewsExpand" 
        color="primary" 
        class="reviewsButton" 
        :style="[ showReviews ? {opacity: '1.0!important'} : {} ]"
        style="z-index: 100;" >
        REVIEWS
        <v-icon>{{ showReviews ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>

      <v-btn depressed v-else
        @click.stop="" 
        disabled
        color="primary" 
        class="reviewsButton" 
        style="z-index: 100;" >
        REVIEWS
        <v-icon>{{ showReviews ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>

      <v-btn depressed @click.stop="" 
        color="primary"
        class="addReviewButton"
        style="z-index: 100;" >
        ADD REVIEW
        <v-icon>mdi-comment-plus-outline</v-icon>
      </v-btn>

    </v-card-actions>
    <v-expand-transition>
      <div v-show="showReviews" class="reviews pa-n2 ma-n2 mx-n3">
        <Review v-for="(review, index) in reviews" 
          :key="index" 
          :userEmail="review.user" 
          :index="index"
          :review="review"
          :type="type" />
      </div>
    </v-expand-transition>

  </v-card>
</template>

<script>
import { getSchoolReviews, getCourseReviews, getTeacherReviews } from '@/scripts/dbActions.js'

import Matrix from '@/components/Matrix/Matrix'
import Review from '@/components/Card/Review'
import Details from '@/components/Card/Details'
// import Writeup from '@/components/Card/Writeup'

export default {
  props: [ "matrixable", "type", "startsCollapsed", "isCollapsible" ],
  components: {
    Matrix,
    Review,
    Details,
    // Writeup
  },
  data() {
    return {
      showWriteup: false,
      reviews: [],
      showReviews: false,
      isCollapsed: false
    }
  },
  computed: {
    align() {
      if (!this.isCollapsed) return "align-end";
      return "align-start";
    },
    image() {
      if (this.matrixable.img) return this.matrixable.img;
      return "https://i.imgur.com/IVLnmb.png";
    }
  },
  methods: {
    reviewsExpand() {
      // eslint-disable-next-line no-console
      console.log("reviews expanding...");
      if (!this.showReviews) this.loadReviews();
      this.showReviews = !this.showReviews;
    },
    loadReviews() {
      // eslint-disable-next-line no-console
      console.log("loading reviews...");
      if (this.type == "school") getSchoolReviews(this.matrixable.id).then(reviews => this.reviews = reviews);
      else if (this.type == "course") getCourseReviews(this.matrixable.id).then(reviews => this.reviews = reviews);
      else getTeacherReviews(this.matrixable.id).then(reviews => this.reviews = reviews);
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.matrixable);
    getCourseReviews(this.matrixable);
    this.isCollapsed = this.startsCollapsed;
  }
}
</script>

<style>
.card {
  transition: height .5s;
}

.v-card--link:before {
  opacity: 0 !Important;
}

.collapsed {
  height: 40px;
  overflow-y: hidden;
}

.collapsible:hover {
  background: aliceblue;
  cursor: pointer;
}

.expandable:hover {
  background: aliceblue;
  cursor: pointer;
}

.reviews {
  background-color: rgb(238, 242, 245, 0.5);
}

.reviewsButton, .addReviewButton {
  color: white !important;
  opacity: 0.5;
}

.reviewsButton:hover, .addReviewButton:hover {
  opacity: 1;
}

</style>