import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/account',
    name: 'account',
    // route level code-splitting
    // this generates a separate chunk (account.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/school',
    name: 'school',
    component: () => import('../views/School.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) next()
//       else next(
//         { path: "/login" }
//       ) 
//     });
//   } else {
//     next();
//   }
// })

export default router
