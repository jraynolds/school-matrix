// const fb = require('@/firebaseConfig.js');

// import { store } from '@/store.js'

// export default {
//   setUser(id) {
//     // eslint-disable-next-line no-console
//     console.log(id);
//     let docRef = fb.db.collection("users").doc(id);
//     docRef.get().then(function(doc) {
//       if (doc.exists) store.commit("setUser", { user: doc.data(), id: id });
//       // eslint-disable-next-line no-console
//       else console.log("No such user.");
//     }).catch(function(error) {
//       // eslint-disable-next-line no-console
//       console.log(error);
//     });
//   },
//   setUserReviews(id) {
//     // eslint-disable-next-line no-console
//     console.log(id);
//     for (let type of ["course", "teacher", "school"]) {
//       fb.db.collection(`${type}Reviews`).get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           // eslint-disable-next-line no-console
//           console.log(doc.data());
//           if (doc.data().user != id) return;
//           // eslint-disable-next-line no-console
//           console.log("Matches current user.");
//           store.commit("addReview", { "review": doc.data(), "type": type });
//         });
//       });
//     }
//   },
//   setUserSchool(id) {
//     let docRef = fb.db.collection("schools").doc(id);
//     docRef.get().then(function(doc) {
//       if (doc.exists) store.commit("setUserSchool", doc.data());
//     }).catch(function() {
//     });
//   }
// }