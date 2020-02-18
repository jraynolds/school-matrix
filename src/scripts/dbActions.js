import { userCollection } from "@/firebaseConfig.js"
import { getDefaultMatrixSet } from '@/components/Matrix/matrices.js'

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

export default {
  isNewUser,
  createNewUser
}