/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  userCollection, 
  schoolCollection, 
  courseCollection, 
  teacherCollection ,
  schoolReviewCollection, 
  courseReviewCollection, 
  teacherReviewCollection, 
} from "@/firebaseConfig.js"
/* eslint-enable no-unused-vars */
import { getDefaultMatrixSet } from '@/components/Matrix/matrices.js'

const imports = {
  userCollection: userCollection, 
  schoolCollection: schoolCollection, 
  courseCollection: courseCollection, 
  teacherCollection: teacherCollection,
  schoolReviewCollection: schoolReviewCollection, 
  courseReviewCollection: courseReviewCollection,
  teacherReviewCollection: teacherReviewCollection, 
}

// UNIVERSAL OPERATIONS
const getDocumentByID = (id, docType, debug=false) => {
  if (debug) console.log(`Getting document by ID. ID = ${id}, docType = ${docType}.`);
  let collection = imports[docType + "Collection"];
  if (debug) console.log("Collection:")
  if (debug) console.log(collection);
  
  return new Promise((resolve, reject) => {
    collection.doc(id).get().then(doc => {
      if (debug) console.log("Document:")
      if (debug) console.log(doc.data());
      resolve(doc.data());
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getDocumentsByIDs = (ids, docType, debug=false) => {
  if (debug) console.log(`Getting documents by IDs. DocType = ${docType}. IDs:`);
  if (debug) console.log(ids);
  let collection = imports[docType + "Collection"];
  if (debug) console.log("Collection:")
  if (debug) console.log(collection);
  let documents = [];
  
  return new Promise((resolve, reject) => {
    collection.get().then(snapshot => {
      if (snapshot.empty) {
        if (debug) console.log("The snapshot's empty!");
      } 
      snapshot.forEach((doc) => {
        if (!ids.includes(doc.id)) return;
        let tempDoc = doc.data();
        tempDoc.id = doc.id;
        if (debug) console.log("Document:")
        if (debug) console.log(tempDoc);
        documents.push(tempDoc);
      });
      if (debug) console.log("Documents:")
      if (debug) console.log(documents);
      resolve(documents);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getDocumentsWhere = (docType, field, comparator, target, user=null, debug=false) => {
  if (debug) console.log(`Getting documents where. docType = ${docType}, field = ${field}, comparator = ${comparator}, target = ${target}, user = ${user}.`);
  let collection = imports[docType + "Collection"];
  if (debug) console.log("Collection:")
  if (debug) console.log(collection);
  let documents = [];

  return new Promise((resolve, reject) => {
    collection.where(field, comparator, target).get().then(snapshot => {
      if (snapshot.empty) {
        if (debug) console.log("The snapshot's empty!");
      }
      snapshot.forEach(doc => {
        if (debug) console.log("Document:")
        if (debug) console.log(doc.data());
        if (user && doc.data().user !== user) {
          if (debug) console.log("This document has a different associated user and was discarded.");
          return;
        }
        let tempDoc = doc.data();
        tempDoc.id = doc.id;
        documents.push(tempDoc);
      });
      if (debug) console.log("Documents:")
      if (debug) console.log(documents);
      resolve(documents);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

// USER OPERATIONS

const isNewUser = (authResult) => {
  return new Promise((resolve, reject) => {
    userCollection.doc(authResult.user.email).get().then(doc => {
      resolve(!doc.exists);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const createNewUser = (authResult, name, school='') => {
  if (!name) name = authResult.user.displayName;
  let matrixSet = getDefaultMatrixSet();
  return new Promise((resolve, reject) => {
    userCollection.doc(authResult.user.email).set({
      name: name,
      school: school,
      matrices: matrixSet
    }).then(() => {
      resolve();
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const updateUserInfo = (info, email, store) => {
  return new Promise((resolve, reject) => {
    userCollection.doc(email).update(info).then(() => {
      store.dispatch('loadUserProfile', email);
      resolve();
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getUserReviews = (user, debug=false) => {
  return Promise.all([
    getDocumentsWhere("schoolReview", "user", "==", user, null, debug),
    getDocumentsWhere("courseReview", "user", "==", user, null, debug),
    getDocumentsWhere("teacherReview", "user", "==", user, null, debug)
  ]).then((reviews) => {
    if (debug) console.log("Reviews:");
    if (debug) console.log(reviews);
    return {
      schools: reviews[0],
      courses: reviews[1],
      teachers: reviews[2]
    };
  })
}

const getUserReviewItems = (user, debug=false) => {
  return Promise.all([
    getDocumentsWhere("schoolReview", "user", "==", user, null, debug),
    getDocumentsWhere("courseReview", "user", "==", user, null, debug),
    getDocumentsWhere("teacherReview", "user", "==", user, null, debug)
  ]).then((reviews) => {
    if (debug) console.log("Reviews:");
    if (debug) console.log(reviews);
    let schoolIDs = reviews[0].map(r => r.school);
    if (debug) console.log(schoolIDs);
    let courseIDs = reviews[1].map(r => r.course);
    if (debug) console.log(courseIDs);
    let teacherIDs = reviews[2].map(r => r.teacher);
    if (debug) console.log(teacherIDs);
    return Promise.all([
      getDocumentsByIDs(schoolIDs, "school", debug),
      getDocumentsByIDs(courseIDs, "course", debug),
      getDocumentsByIDs(teacherIDs, "teacher", debug)
    ]).then((items) => {
      if (debug) console.log("Items:");
      if (debug) console.log(items);
      return {
        schools: items[0],
        courses: items[1],
        teachers: items[2]
      }
    });
  });
}

export {
  getDocumentByID,
  getDocumentsWhere,
  getDocumentsByIDs,

  isNewUser,
  createNewUser,
  updateUserInfo,
  getUserReviews,
  getUserReviewItems
}
/* eslint-enable no-console */