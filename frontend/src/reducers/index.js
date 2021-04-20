import { combineReducers } from 'redux'
import { enrolledCoursesReducer } from './courseReducers'
import { globalNewsReducer } from './newsReducers'
import { userListReducer, userLoginReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    globalNews: globalNewsReducer,
    enrolledCourses: enrolledCoursesReducer,
    userList: userListReducer
})

export default rootReducer
