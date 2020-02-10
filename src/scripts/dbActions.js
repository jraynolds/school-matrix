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
  }
}