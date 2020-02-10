const fb = require('@/firebaseConfig.js');

export default {
  getUser(id) {
    // eslint-disable-next-line no-console
    console.log(fb);
    // eslint-disable-next-line no-console
    console.log(fb.db);
    // eslint-disable-next-line no-console
    console.log(id);
    let docRef = fb.db.collection("users").doc(id);
    docRef.get().then(function(doc) {
      // eslint-disable-next-line no-console
      console.log(doc);
      // eslint-disable-next-line no-console
      console.log(doc.data());
      if (doc.exists) return doc.data();
      // eslint-disable-next-line no-console
      else console.log("No such user.");
    }).catch(function(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }
}