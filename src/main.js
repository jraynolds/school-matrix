import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store.js'

Vue.config.productionTip = false

// Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);