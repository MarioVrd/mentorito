import { combineReducers } from 'redux'
import { userLoginReducer } from './userReducers'

const rootReducer = combineReducers({
    userLogin: userLoginReducer
})

export default rootReducer
