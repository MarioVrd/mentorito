import axios from 'axios'
import {
    GLOBAL_NEWS_FAIL,
    GLOBAL_NEWS_REQUEST,
    GLOBAL_NEWS_SUCCESS
} from '../constants/newsConstants'

export const getGlobalNews = () => async dispatch => {
    try {
        dispatch({ type: GLOBAL_NEWS_REQUEST })

        const { data } = await axios.get('/api/news')

        dispatch({ type: GLOBAL_NEWS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: GLOBAL_NEWS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
