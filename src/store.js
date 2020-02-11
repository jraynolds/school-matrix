import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
// import createPersistedState from 'vuex-persistedstate'

import dbActions from '@/scripts/dbActions.js'

// import AuthService from '@/services/AuthService.js'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    token: '',
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
  };
};

export default new Vuex.Store({
  strict: true,
  // plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
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
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, payload) {
      state.user = payload.user;
      state.user.id = payload.id;
      dbActions.setUserReviews(payload.id);
      dbActions.setUserSchool(payload.user.school);
    },
    ADD_REVIEW(state, payload) {
      state.userReviews[payload["type"]].push(payload["review"]);
    },
    SET_USER_SCHOOL(state, school) {
      state.userSchool = school;
    },
    RESET(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    // login: ({ commit, dispatch }, { token, user }) => {
    // login: ({ commit }, { token, user }) => {
    //   commit('SET_TOKEN', token);
    //   commit('SET_USER', user);

    //   Axios.defaults.headers.commom['Authorization'] = `Bearer ${token}`
    // },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  },
})