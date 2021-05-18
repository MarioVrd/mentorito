import { combineReducers } from 'redux'
import {
    courseDetailsReducer,
    courseEnrollReducer,
    courseListReducer,
    enrolledCoursesReducer
} from './courseReducers'
import {
    globalNewsCreateReducer,
    globalNewsUpdateReducer,
    globalNewsDeleteReducer,
    globalNewsReducer
} from './newsReducers'
import {
    exerciseDetailsReducer,
    exerciseSubmitReducer,
    exerciseCreateReducer
} from './exerciseReducers'
import { userListReducer, userLoginReducer, userRegisterReducer } from './userReducers'
import { uploadReducer } from './uploadReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    enrolledCourses: enrolledCoursesReducer,
    globalNews: globalNewsReducer,
    globalNewsCreate: globalNewsCreateReducer,
    globalNewsUpdate: globalNewsUpdateReducer,
    globalNewsDelete: globalNewsDeleteReducer,
    userList: userListReducer,
    courseList: courseListReducer,
    courseDetails: courseDetailsReducer,
    courseEnroll: courseEnrollReducer,
    userRegister: userRegisterReducer,
    exerciseDetails: exerciseDetailsReducer,
    upload: uploadReducer,
    exerciseSubmit: exerciseSubmitReducer,
    exerciseCreate: exerciseCreateReducer
})

export default rootReducer
