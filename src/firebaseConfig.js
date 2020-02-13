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
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()

// firebase collections

export {
    db,
    // eventsCollection
}