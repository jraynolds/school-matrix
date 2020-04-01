import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store.js'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);