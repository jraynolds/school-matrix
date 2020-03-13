import { userCollection, schoolCollection, schoolReviewCollection, courseCollection, teacherCollection } from "@/firebaseConfig.js"
import { getDefaultMatrixSet } from '@/components/Matrix/matrices.js'
import { courseReviewCollection } from "../firebaseConfig";

// UNIVERSAL OPERATIONS
const getDocumentByID = (id, docType) => {
  let collection = null;
  if (docType == "user") collection = userCollection;
  else if (docType == "school") collection = schoolCollection;
  else if (docType == "teacher") collection = courseCollection;
  else collection = courseCollection;
  
  return new Promise((resolve, reject) => {
    collection.doc(id).get().then(doc => {
      resolve(doc.data());
    }).catch(err => {
      reject(Error(err));
    });
  });
}

// USER OPERATIONS

const getUser = (email) => {
  return new Promise((resolve, reject) => {
    userCollection.doc(email).get().then(doc => {
      resolve(doc.data());
    }).catch(err => {
      reject(Error(err));
    });
  });
}

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

// SCHOOL OPERATIONS

const getSchool = (id) => {
  return new Promise((resolve, reject) => {
    schoolCollection.doc(id).get().then(doc => 
      {
        let school = doc.data();
        school.id = doc.id;
        resolve(school);
      }).catch(err => {
        reject(Error(err));
      });
  });
}

const getSchools = () => {
  let schools = [];

  return new Promise((resolve, reject) => {
    schoolCollection.get().then(snapshot => {
      if (snapshot.empty) return;
      snapshot.forEach(doc => {
        schools.push({
          text: `${doc.data().name}, ${doc.data().location.city} ${doc.data().location.state}`,
          value: doc.id
        });
      })
      resolve(schools);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getSchoolsAtLocation = (location) => {
  let schools = [];

  return new Promise((resolve, reject) => {
    schoolCollection.where('location', '==', location).get().then(snapshot => {
        if (snapshot.empty) resolve();
        snapshot.forEach(doc => {
          schools.push({
            text: `${doc.data().name}, ${doc.data().location.city} ${doc.data().location.state}`,
            value: doc.id
          });
        })
        resolve(schools);
      }).catch(err => {
        reject(Error(err));
      });
  });
}

const getSchoolReviews = (school) => {
  // eslint-disable-next-line no-console
  console.log(school);
  let reviews = [];
  
  return new Promise((resolve, reject) => {
    schoolReviewCollection.where('school', '==', school).get().then(snapshot => {
      // eslint-disable-next-line no-console
      console.log(snapshot);
      if (snapshot.empty) return;
      snapshot.forEach(doc => {
        reviews.push(doc.data());
      });
      resolve(reviews);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

// COURSE OPERATIONS

const getCoursesAtSchool = (school) => {
  let courses = [];

  return new Promise((resolve, reject) => {
    courseCollection.where('schools', 'array-contains', school).get().then(snapshot => {
      // eslint-disable-next-line no-console
      console.log(snapshot);
      if (snapshot.empty) return;
      snapshot.forEach(doc => {
        // eslint-disable-next-line no-console
        console.log(doc.data());
        let course = doc.data();
        course.id = doc.id;
        courses.push(course);
      });
      // eslint-disable-next-line no-console
      console.log(courses);
      resolve(courses);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getCoursesByTeacher = (teacher) => {
  let courses = [];

  return new Promise((resolve, reject) => {
    courseCollection.where('teachers', 'array-contains', teacher).get().then(snapshot => {
      if (snapshot.empty) return;
      snapshot.forEach(doc => {
        courses.push(doc.data());
      });
      resolve(courses);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getCourseReviews = (course) => {
  let reviews = [];
  
  return new Promise((resolve, reject) => {
    courseReviewCollection.where('course', '==', course).get().then(snapshot => {
      if (snapshot.empty) return;
      snapshot.forEach(doc => {
        let review = doc.data();
        review.id = doc.id;
        reviews.push(review);
      });
      resolve(reviews);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

// TEACHER OPERATIONS

const getTeachersAtSchool = (school) => {
  let teachers = [];

  return new Promise((resolve, reject) => {
    teacherCollection.where('schools', 'array-contains', school).get().then(snapshot => {
      if (snapshot.empty) return;
      snapshot.forEach(doc => {
        let teacher = doc.data();
        teacher.id = doc.id;
        teachers.push(teacher);
      });
      resolve(teachers);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getTeacher = (id) => {
  return new Promise((resolve, reject) => {
    teacherCollection.doc(id).get().then(doc => {
      let teacher = doc.data();
      teacher.id = doc.id;
      resolve(teacher);
    }).catch(err => {
      reject(Error(err));
    });
  });
}

const getTeachers = (ids) => {
  let teachers = [];

  return new Promise((resolve, reject) => {
    for (let id of ids) {
      teacherCollection.doc(id).get().then(doc => {
        let teacher = doc.data();
        teacher.id = doc.id;
        teachers.push(teacher);
      }).catch(err => {
        reject(Error(err));
      });
    }
    resolve(teachers);
  });
}

export {
  getDocumentByID,

  getUser,
  isNewUser,
  createNewUser,
  updateUserInfo,

  getSchool,
  getSchoolsAtLocation,
  getSchools,
  getSchoolReviews,

  getCoursesAtSchool,
  getCoursesByTeacher,
  getCourseReviews,

  getTeacher,
  getTeachers,
  getTeachersAtSchool
}