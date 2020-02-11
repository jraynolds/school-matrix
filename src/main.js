import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store.js'
// import Axios from 'axios'
import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyCVquGkTl-4D_lqUzBQB8P899q0IiQJs-A",
  authDomain: "school-matrix-979dd.firebaseapp.com",
  databaseURL: "https://school-matrix-979dd.firebaseio.com",
  projectId: "school-matrix-979dd",
  storageBucket: "school-matrix-979dd.appspot.com",
  messagingSenderId: "895171472104",
  appId: "1:895171472104:web:a9199d02db9b89d5b2b75d",
  measurementId: "G-CGZ3V2WB18"
}
firebase.initializeApp(config)

Vue.config.productionTip = false

// Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
