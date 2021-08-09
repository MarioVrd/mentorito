import {
    GLOBAL_NEWS_CREATE_FAIL,
    GLOBAL_NEWS_CREATE_REQUEST,
    GLOBAL_NEWS_CREATE_RESET,
    GLOBAL_NEWS_CREATE_SUCCESS,
    GLOBAL_NEWS_UPDATE_FAIL,
    GLOBAL_NEWS_UPDATE_REQUEST,
    GLOBAL_NEWS_UPDATE_RESET,
    GLOBAL_NEWS_UPDATE_SUCCESS,
    GLOBAL_NEWS_DELETE_FAIL,
    GLOBAL_NEWS_DELETE_REQUEST,
    GLOBAL_NEWS_DELETE_SUCCESS,
    GLOBAL_NEWS_FAIL,
    GLOBAL_NEWS_REQUEST,
    GLOBAL_NEWS_SUCCESS,
    GLOBAL_NEWS_DELETE_RESET
} from '../constants/newsConstants'
import { STATUS } from '../constants/requestStatusConstants'


export const globalNewsReducer = (state = { status: STATUS.idle, news: [] }, action) => {
    switch (action.type) {
        case GLOBAL_NEWS_REQUEST:
            return { status: STATUS.loading }
        case GLOBAL_NEWS_SUCCESS:
            return { status: STATUS.completed, ...action.payload }
        case GLOBAL_NEWS_FAIL:
            return { status: STATUS.failed, error: action.payload }
        default:
            return state
    }
}

const initialGlobalNewsCreateState = { status: STATUS.idle }
export const globalNewsCreateReducer = (state = initialGlobalNewsCreateState, action) => {
    switch (action.type) {
        case GLOBAL_NEWS_CREATE_REQUEST:
            return { status: STATUS.loading }
        case GLOBAL_NEWS_CREATE_SUCCESS:
            return { status: STATUS.completed, news: action.payload }
        case GLOBAL_NEWS_CREATE_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case GLOBAL_NEWS_CREATE_RESET:
            return initialGlobalNewsCreateState
        default:
            return state
    }
}

const initialGlobalNewsUpdateState = { status: STATUS.idle }
export const globalNewsUpdateReducer = (state = initialGlobalNewsUpdateState, action) => {
    switch (action.type) {
        case GLOBAL_NEWS_UPDATE_REQUEST:
            return { status: STATUS.loading }
        case GLOBAL_NEWS_UPDATE_SUCCESS:
            return { status: STATUS.completed, news: action.payload }
        case GLOBAL_NEWS_UPDATE_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case GLOBAL_NEWS_UPDATE_RESET:
            return initialGlobalNewsUpdateState
        default:
            return state
    }
}

export const globalNewsDeleteReducer = (state = { status: STATUS.idle }, action) => {
    switch (action.type) {
        case GLOBAL_NEWS_DELETE_REQUEST:
            return { status: STATUS.loading }
        case GLOBAL_NEWS_DELETE_SUCCESS:
            return { status: STATUS.completed, message: action.payload }
        case GLOBAL_NEWS_DELETE_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case GLOBAL_NEWS_DELETE_RESET:
            return { status: STATUS.idle }
        default:
            return state
    }
}
