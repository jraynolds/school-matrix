import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dbActions from '@/scripts/dbActions.js'

export const store = new Vuex.Store({
    state: {
        user: {
          name: "",
          email: "",
          matrices: {
            teacher: {
              Approachable: 1,
              Innovative: 1,
              Inspirational: 1,
              Instructive: 1,
              Skillful: 1,
              Strict: 1
            },
            course: {
              Experimental: 1,
              "Fast-paced": 1,
              "Hands-on": 1,
              Lecturing: 1,
              Relevant: 1,
              "Student-led": 1
            },
            school: {
              Accommodating: 1,
              Demanding: 1,
              Grounds: 1,
              Progressive: 1,
              Resources: 1,
              Transparent: 1
            }
          }
        },
        userReviews: {
          teacher: [],
          course: [],
          school: []
        },
        userSchool: {
          name: ""
        },
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
      setUser(state, payload) {
        state.user = payload.user;
        state.user.id = payload.id;
        dbActions.setUserReviews(payload.id);
        dbActions.setUserSchool(payload.user.school);
      },
      addReview(state, payload) {
        // eslint-disable-next-line no-console
        console.log(payload);
        state.userReviews[payload["type"]].push(payload["review"]);
      },
      setUserSchool(state, school) {
        state.userSchool = school;
      }
    }
})