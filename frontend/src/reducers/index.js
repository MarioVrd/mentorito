import { combineReducers } from 'redux'
import {
    courseDetailsReducer,
    courseEnrollReducer,
    courseListReducer,
    enrolledCoursesReducer
} from './courseReducers'
import { globalNewsReducer } from './newsReducers'
import { exerciseDetailsReducer } from './exerciseReducers'
import { userListReducer, userLoginReducer, userRegisterReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    enrolledCourses: enrolledCoursesReducer,
    globalNews: globalNewsReducer,
    userList: userListReducer,
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    courseEnroll: courseEnrollReducer,
    userRegister: userRegisterReducer,
    exerciseDetails: exerciseDetailsReducer
})

export default rootReducer
