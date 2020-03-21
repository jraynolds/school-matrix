/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  userCollection, 
  schoolCollection, 
  courseCollection, 
  teacherCollection,
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

// WRITING OPERATIONS
const addDocument = (docType, doc, debug=false) => {
	if (debug) console.log(`Adding document of type ${docType}. Document:`);
	if (debug) console.log(doc);
	let collection = imports[docType + "Collection"];
  if (debug) console.log("Collection:");
	if (debug) console.log(collection);
	
	return new Promise((resolve, reject) => {
		collection.add(doc).then(ref => {
			resolve(ref.id);
		}).catch(err => {
			reject(Error(err));
		});
	})
}

const editDocument = (docType, id, doc, debug=false) => {
	if (debug) console.log(`Editing document of type ${docType} at id ${id}. New data:`);
	if (debug) console.log(doc);
	let collection = imports[docType + "Collection"];
  if (debug) console.log("Collection:");
	if (debug) console.log(collection);
	
	return new Promise((resolve, reject) => {
		collection.doc(id).set(doc, { merge: true }).then(ref => {
			resolve(ref.id);
		}).catch(err => {
				reject(Error(err));
		});
	})
}

// UNIVERSAL OPERATIONS
const getDocumentByID = (docType, id, debug=false) => {
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

const getDocumentsByIDs = (docType, ids, debug=false) => {
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
const getUser = (email, debug) => {
	if (debug) console.log(`Getting a user with email = ${email}`);
	return new Promise((resolve, reject) => {
		getDocumentsWhere("user", "email", "==", email, null, debug).then(docs => {
			if (docs.length > 0) {
				if (debug) console.log("There's a user with that email already.");
				resolve(docs[0]);
			} else {
				if (debug) console.log("This is a new user!");
				resolve(null);
			}
		}).catch(err => {
			reject(Error(err));
		});
  });
}

const createNewUser = (authResult, email, name, school='', debug) => {
	if (debug) console.log(`Creating new user. Email = ${email}, name = ${name}, School = ${school}. Authresult:`);
	if (debug) console.log(authResult);
	if (!name) name = authResult.user.displayName;
	if (!email) email = authResult.user.email;
	let matrixSet = getDefaultMatrixSet();
	let userInfo = { name: name, email: email, school: school, matrices: matrixSet };
  return new Promise((resolve, reject) => {
		addDocument("user", userInfo, debug).then(id => {
			resolve(id);
		}).catch(err => {
      reject(Error(err));
		});
  });
}

const updateUserInfo = (info, email, store) => {
  return new Promise((resolve, reject) => {
    userCollection.doc(email).update(info).then(() => {
			// store.dispatch('loadUserProfile', email);
			console.log(store);
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
	addDocument,
	editDocument,

  getDocumentByID,
  getDocumentsWhere,
  getDocumentsByIDs,

  getUser,
  createNewUser,
  updateUserInfo,
  getUserReviews,
  getUserReviewItems
}
/* eslint-enable no-console */