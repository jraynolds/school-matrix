import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
// import createPersistedState from 'vuex-persistedstate'

// import dbActions from '@/scripts/dbActions.js'

// import AuthService from '@/services/AuthService.js'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    // token: '',
    // user: {
    //   name: "",
    //   email: "",
    //   matrices: {
    //     teacher: {
    //       Approachable: 1,
    //       Innovative: 1,
    //       Inspirational: 1,
    //       Instructive: 1,
    //       Skillful: 1,
    //       Strict: 1
    //     },
    //     course: {
    //       Experimental: 1,
    //       "Fast-paced": 1,
    //       "Hands-on": 1,
    //       Lecturing: 1,
    //       Relevant: 1,
    //       "Student-led": 1
    //     },
    //     school: {
    //       Accommodating: 1,
    //       Demanding: 1,
    //       Grounds: 1,
    //       Progressive: 1,
    //       Resources: 1,
    //       Transparent: 1
    //     }
    //   }
    // },
    // userReviews: {
    //   teacher: [],
    //   course: [],
    //   school: []
    // },
    // userSchool: {
    //   name: ""
    // },
    showLogin: false
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
    },
    getLoginShown: state => {
      return state.showLogin;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
      // state.user.id = payload.id;
      // dbActions.setUserReviews(payload.id);
      // dbActions.setUserSchool(payload.user.school);
    },
    SET_LOGIN_SHOWN(state, shown) {
      state.showLogin = shown;
    },
    ADD_REVIEW(state, payload) {
      state.userReviews[payload["type"]].push(payload["review"]);
    },
    SET_USER_SCHOOL(state, school) {
      state.userSchool = school;
    },
    RESET(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('SET_USER', payload.user);
    },
    setLoginShown ({ commit }, shown) {
      commit('SET_LOGIN_SHOWN', shown);
    },
    // login: ({ commit, dispatch }, { token, user }) => {
    // login: ({ commit }, { token, user }) => {
    //   commit('SET_TOKEN', token);
    //   commit('SET_USER', user);

    //   Axios.defaults.headers.commom['Authorization'] = `Bearer ${token}`
    // },
    // login({commit}, user) {
    //   return new Promise((resolve, reject) => {
    //     firebase
    //     .auth()
    //     .signInWithEmailAndPassword(vm.email, vm.password)
    //     .then(resp => {

    //       vm.$store.commit('SET_LOGIN_SHOWN', false);
    //       vm.$router.push({ path: "account" });
    //       resolve(resp);
    //     })
    //     .catch(err => {
    //       vm.failedOn.email = vm.email;
    //       vm.failedOn.password = vm.password;
    //       if (vm.errorTranslations[err.message]) vm.error = vm.errorTranslations[err.message];
    //       reject(err);
    //     });
    //   });
      
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request')
    //   });
    // },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  },
})