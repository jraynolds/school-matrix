const getDefaultMatrixSet = (value = 3) => {
  let school = {
    Accommodating: value,
    Demanding: value,
    Grounds: value,
    Progressive: value,
    Resources: value,
    Transparent: value
  };
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
  
  return {
    school: school,
    course: course,
    teacher: teacher
  }
} 

const getDefaultMatrixOrder = () => {
  let school = [ "Accommodating", "Demanding", "Grounds", "Progressive", "Resources", "Transparent" ];
  let course = [ "Fast-paced", "Experimental", "Hands-on", "Student-led", "Lecturing", "Relevant" ];
  let teacher = [ "Approachable", "Innovative", "Inspirational", "Instructive", "Skillful", "Strict" ];
  return { school: school, course: course, teacher: teacher };
}

const getMatrixColors = () => {
  let school = { main: "#bb8747", light: "#ff9c73" };
  let course = { main: "#4abd64", light: "#aaff99" };
  let teacher = { main: "#4873bd", light: "#99e5ff" };
  return { school: school, course: course, teacher: teacher };
}

export {
  getDefaultMatrixSet,
  getDefaultMatrixOrder,
  getMatrixColors
}