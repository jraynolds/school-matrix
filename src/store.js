import Vue from 'vue'
import Vuex from 'vuex'
const fb = require("@/firebaseConfig.js")

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    token: "",
    user: {
      uid: '',
      email: '',
      name: '',
      school: {
        name: '',
        location: null
      },
      reviews: {
        course: [],
        teacher: [],
        school: []
      },
      matrices: null,
    },
    showLogin: false
  };
};

export default new Vuex.Store({
  strict: true,
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    getUserReviews: state => {
      return state.user.reviews;
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
      state.user.uid = user.uid;
      state.user.email = user.email;
    },
    SET_USER_PROFILE(state, payload) {
      state.user.name = payload.name;
      state.user.matrices = payload.matrices;
    },
    SET_USER_SCHOOL(state, school) {
      state.user.school = school;
    },
    SET_LOGIN_SHOWN(state, shown) {
      state.showLogin = shown;
    },
    SET_USER_REVIEWS(state, payload) {
      // eslint-disable-next-line no-console
      console.log(payload);
      state.user.reviews[payload.type] = payload.array;
    }
    // RESET(state) {
    //   Object.assign(state, getDefaultState());
    // },
  },
  actions: {
    // User actions
    loadUser({ commit, dispatch }, user) {
      commit('SET_USER', user);
      dispatch('loadUserProfile', user.email);
      dispatch('loadUserReviews', user.email);
    },
    loadUserProfile({ commit, dispatch }, email) {
      fb.userCollection.doc(email).get().then(res =>{
        commit('SET_USER_PROFILE', {
          name: res.data().name,
          matrices: res.data().matrices,
        });
        dispatch('loadUserSchool', res.data().school);
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    loadUserSchool({ commit }, school) {
      fb.schoolCollection.doc(school).get().then(res => {
        commit('SET_USER_SCHOOL', res.data());
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    },
    loadUserReviews({ commit }, email) {
      let course = [];
      // let teacher = [];
      // let school = [];

      fb.courseReviewCollection.where('user', '==', email).get().then(snapshot => {
        if (snapshot.empty) return;
        snapshot.forEach(doc => {
          course.push(doc.data());
        })
        commit('SET_USER_REVIEWS', { type: "course", array: course });
      });
    },
    // Document actions
    setLoginShown({ commit }, shown) {
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