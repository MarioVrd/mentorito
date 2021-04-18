import { combineReducers } from 'redux'
import { enrolledCoursesReducer } from './courseReducers'
import { globalNewsReducer } from './newsReducers'
import { userLoginReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    globalNews: globalNewsReducer,
    enrolledCourses: enrolledCoursesReducer
})

export default rootReducer
