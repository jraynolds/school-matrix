const getDefaultMatrixSet = (value = 3) => {
  let course = {
    Experimental: value,
    "Fast-paced": value,
    "Hands-on": value,
    Lecturing: value,
    Relevant: value,
    "Student-led": value
  };
  let teacher = {
    Approachable: value,
    Innovative: value,
    Inspirational: value,
    Instructive: value,
    Skillful: value,
    Strict: value
  };
  let school = {
    Accommodating: value,
    Demanding: value,
    Grounds: value,
    Progressive: value,
    Resources: value,
    Transparent: value
  };
  
  return {
    course: course,
    teacher: teacher,
    school: school
  }
} 

export {
  getDefaultMatrixSet
}