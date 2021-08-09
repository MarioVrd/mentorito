import {
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_NOTIFICATIONS_FAIL,
    USER_NOTIFICATIONS_REQUEST,
    USER_NOTIFICATIONS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_RESET
} from '../constants/userConstants'
import { STATUS } from '../constants/requestStatusConstants'

export const userLoginReducer = (state = { status: STATUS.idle}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, status: STATUS.loading }
        case USER_LOGIN_SUCCESS:
            return { ...state, status: STATUS.completed, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { ...state, status: STATUS.failed, error: action.payload }
        case USER_LOGOUT:
            return { status: STATUS.idle}
        default:
            return state
    }
}

export const userListReducer = (state = { status: STATUS.idle, users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { status: STATUS.loading }
        case USER_LIST_SUCCESS:
            return { status: STATUS.completed, users: action.payload }
        case USER_LIST_FAIL:
            return { status: STATUS.failed, error: action.payload }
        default:
            return state
    }
}

export const userRegisterReducer = (state = { status: STATUS.idle}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { status: STATUS.loading }
        case USER_REGISTER_SUCCESS:
            return { status: STATUS.completed, user: action.payload }
        case USER_REGISTER_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case USER_REGISTER_RESET:
            return {status: STATUS.idle}
        default:
            return state
    }
}

export const userNotificationsReducer = (state = { status: STATUS.idle }, action) => {
    switch (action.type) {
        case USER_NOTIFICATIONS_REQUEST:
            return { status: STATUS.loading }
        case USER_NOTIFICATIONS_SUCCESS:
            return { status: STATUS.completed, notifications: action.payload }
        case USER_NOTIFICATIONS_FAIL:
            return { status: STATUS.failed, error: action.payload }
        default:
            return state
    }
}
