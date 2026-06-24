const students = new Map()
const classes = new Map()

export const resetStore = () => {
  students.clear()
  classes.clear()
}

export const getStudent = (studentId) => {
  return students.get(studentId)
}

export const saveStudent = (student) => {
  students.set(student.studentId, student)
  return student
}

export const hasStudent = (studentId) => {
  return students.has(studentId)
}

export const getClass = (classCode) => {
  return classes.get(classCode)
}

export const saveClass = (clazz) => {
  classes.set(clazz.classCode, clazz)
  return clazz
}

export const hasClass = (classCode) => {
  return classes.has(classCode)
}
