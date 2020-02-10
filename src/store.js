import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null
    },
    actions: {
        
    },
    getters: {
      getUser: state => {
        return state.user;
      }
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      }
    }
})