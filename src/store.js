import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dbActions from '@/scripts/dbActions.js'

export const store = new Vuex.Store({
    state: {
        user: null,
        userReviews: {
          "teacher": [],
          "course": [],
          "school": []
        },
        userSchool: null,
    },
    actions: {
        
    },
    getters: {
      getUser: state => {
        return state.user;
      },
      getUserReviews: state => {
        return state.userReviews;
      },
      getUserSchool: state => {
        return state.userSchool;
      }
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
        dbActions.setUserReviews(user.id);
        dbActions.setSchool(user.school);
      },
      addReview(state, payload) {
        state.userReviews[payload["type"]].push(payload["review"]);
      },
      setUserSchool(state, school) {
        state.userSchool = school;
      }
    }
})