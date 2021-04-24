import { combineReducers } from 'redux'
import {
    courseDetailsReducer,
    courseEnrollReducer,
    courseListReducer,
    enrolledCoursesReducer
} from './courseReducers'
import { globalNewsReducer } from './newsReducers'
import { userListReducer, userLoginReducer, userRegisterReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    enrolledCourses: enrolledCoursesReducer,
    globalNews: globalNewsReducer,
    userList: userListReducer,
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    courseEnroll: courseEnrollReducer,
    userRegister: userRegisterReducer
})

export default rootReducer
