import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: "School Matrix - Find your Model!"
    }
  },
  {
    path: '/account',
    name: 'account',
    // route level code-splitting
    // this generates a separate chunk (account.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    meta: {
      title: "Your Account",
      requiresAuth: true
    }
  },
  {
    path: '/school',
    name: 'school',
    component: () => import('../views/School.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // eslint-disable-next-line no-console
  console.log(nearestWithTitle);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  // if (to.matched.some(record => record.meta.auth)) {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) next()
  //     else next(
  //       { path: "/login" }
  //     ) 
  //   });
  // } else {
  //   next();
  // }
  next();
})

export default router
