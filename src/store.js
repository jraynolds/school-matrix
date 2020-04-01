import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import { getDocumentByID } from './scripts/dbActions';

Vue.use(Vuex)

//     user: {
//       id: '',
//       email: '',
//       name: '',
//       school: {
//         name: '',
//         location: {
//           city: '',
//           state: ''
//         }
//       },
//       reviews: {
//         course: [],
//         teacher: [],
//         school: []
//       },
//       matrices: null,
//     },

export default new Vuex.Store({
  strict: true,
  state: {
		isLoggedIn: false,
    user: null,
    showLoginDialog: false,
    showReviewDialog: false
	},
	getters: {
		isLoggedIn: state => state.isLoggedIn,
		user: state => state.user,
		loginDialogShown: state => state.showLoginDialog,
		reviewDialogShown: state => state.showReviewDialog
  },
  mutations: {
		logout(state) {
			state.isLoggedIn = false;
			state.user = null;
		},
    set_login_dialog_shown(state, isShown) {
      state.showLoginDialog = isShown;
    },
		set_review_dialog_shown(state, isShown) {
			state.showReviewDialog = isShown;
		},
		set_user(state, user) {
			state.user = user;
			state.isLoggedIn = true;
		}
  },
  actions: {
    // User actions
		loadUser({ commit }, user) {
			commit('set_user', user);
		},
		loadUserByID({ dispatch }, id=this.state.id) {
			getDocumentByID("user", id, true).then(user => {
				user.id = id;
				dispatch('loadUser', user);
			});
    },
  },
})