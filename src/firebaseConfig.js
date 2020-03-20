import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
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
if (!firebase.apps.length) firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const userCollection = db.collection("users")
const teacherCollection = db.collection("teachers")
const courseCollection = db.collection("courses")
const schoolCollection = db.collection("schools")
const courseReviewCollection = db.collection("courseReviews")
const teacherReviewCollection = db.collection("teacherReviews")
const schoolReviewCollection = db.collection("schoolReviews")

export {
  db,
  auth,
  currentUser,
  userCollection,
  teacherCollection,
  courseCollection,
  schoolCollection,
  courseReviewCollection,
  teacherReviewCollection,
  schoolReviewCollection
}