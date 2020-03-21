import Vue from 'vue'
import Vuex from 'vuex'
import { getDocumentByID, getUserReviews } from './scripts/dbActions';

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    token: "",
    user: {
      id: '',
      email: '',
      name: '',
      school: {
        name: '',
        location: {
          city: '',
          state: ''
        }
      },
      reviews: {
        course: [],
        teacher: [],
        school: []
      },
      matrices: null,
    },
    showLogin: false,
    showReviewDialog: false
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
    },
    getReviewDialogShown: state => {
      return state.showReviewDialog;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
			state.user = user;
    },
    SET_USER_PROFILE(state, payload) {
      state.user.name = payload.name;
      state.user.matrices = payload.matrices;
    },
    SET_USER_SCHOOL(state, school) {
      state.user.school = school;
    },
    SET_LOGIN_SHOWN(state, isShown) {
      state.showLogin = isShown;
    },
    SET_USER_REVIEWS(state, reviews) {
      state.user.reviews = reviews;
    },
    SET_REVIEW_DIALOG_SHOWN(state, isShown) {
      state.showReviewDialog = isShown;
    }
  },
  actions: {
    // User actions
		loadUser({ commit }, user) {
			commit('SET_USER', user);
		},
		loadUserByID({ dispatch }, id=this.state.id) {
			getDocumentByID("user", id, true).then(user => {
				user.id = id;
				dispatch('loadUser', user);
				dispatch('loadUserReviews');
			});
    },
    loadUserReviews({ commit }, id=this.state.user.id) {
			// eslint-disable-next-line no-console
			console.log(id);
      getUserReviews(id).then(reviews => {
				commit('SET_USER_REVIEWS', reviews);
			});
    },
    // Document actions
    setLoginShown({ commit }, shown) {
      commit('SET_LOGIN_SHOWN', shown);
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  },
})