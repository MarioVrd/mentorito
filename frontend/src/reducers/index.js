import { combineReducers } from 'redux'
import { courseListReducer, enrolledCoursesReducer } from './courseReducers'
import { globalNewsReducer } from './newsReducers'
import { userListReducer, userLoginReducer, userRegisterReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    globalNews: globalNewsReducer,
    enrolledCourses: enrolledCoursesReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    courseList: courseListReducer
})

export default rootReducer
