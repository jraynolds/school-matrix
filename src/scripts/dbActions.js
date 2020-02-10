const fb = require('@/firebaseConfig.js');

import { store } from '@/store.js'

export default {
  setUser(id) {
    let docRef = fb.db.collection("users").doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) store.commit("setUser", doc.data());
      // eslint-disable-next-line no-console
      else console.log("No such user.");
    }).catch(function(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  },
  setUserReviews(id) {
    for (let type of ["course", "teacher", "school"]) {
      fb.db.collection(`${type}Reviews`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().user != id) return;
          store.commit("addReview", { "review": doc.data(), "type": type });
        });
      });
    }
  },
  setUserSchool(id) {
    let docRef = fb.db.collection("schools").doc(id);
    docRef.get().then(function(doc) {
      if (doc.exists) store.commit("setUserSchool", doc.data());
    }).catch(function() {
    });
  }
}