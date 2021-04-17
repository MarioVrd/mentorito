import {
    GLOBAL_NEWS_FAIL,
    GLOBAL_NEWS_REQUEST,
    GLOBAL_NEWS_SUCCESS
} from '../constants/newsConstants'

export const globalNewsReducer = (state = { news: [] }, action) => {
    switch (action.type) {
        case GLOBAL_NEWS_REQUEST:
            return { loading: true }
        case GLOBAL_NEWS_SUCCESS:
            return { loading: false, news: action.payload }
        case GLOBAL_NEWS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
