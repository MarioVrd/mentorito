import { combineReducers } from 'redux'
import { globalNewsReducer } from './newsReducers'
import { userLoginReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    globalNews: globalNewsReducer
})

export default rootReducer
