import { combineReducers } from 'redux'
import {
    courseCreateReducer,
    courseDeleteReducer,
    courseDetailsReducer,
    courseMaterialAddReducer,
    courseEnrollReducer,
    courseListReducer,
    courseUpdateReducer,
    enrolledCoursesReducer,
    courseNewsListReducer
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
import {
    userListReducer,
    userLoginReducer,
    userNotificationsReducer,
    userRegisterReducer
} from './userReducers'
import { uploadReducer } from './uploadReducers'
import { uiGlobalsReducer } from './uiReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userNotifications: userNotificationsReducer,
    enrolledCourses: enrolledCoursesReducer,
    globalNews: globalNewsReducer,
    globalNewsCreate: globalNewsCreateReducer,
    globalNewsUpdate: globalNewsUpdateReducer,
    globalNewsDelete: globalNewsDeleteReducer,
    userList: userListReducer,
    courseList: courseListReducer,
    courseCreate: courseCreateReducer,
    courseUpdate: courseUpdateReducer,
    courseDelete: courseDeleteReducer,
    courseDetails: courseDetailsReducer,
    courseNewsList: courseNewsListReducer,
    courseMaterialAdd: courseMaterialAddReducer,
    courseEnroll: courseEnrollReducer,
    userRegister: userRegisterReducer,
    exerciseDetails: exerciseDetailsReducer,
    upload: uploadReducer,
    exerciseSubmit: exerciseSubmitReducer,
    exerciseCreate: exerciseCreateReducer,
    uiGlobals: uiGlobalsReducer
})

export default rootReducer
