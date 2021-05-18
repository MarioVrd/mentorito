import axios from 'axios'
import {
    GLOBAL_NEWS_CREATE_REQUEST,
    GLOBAL_NEWS_CREATE_SUCCESS,
    GLOBAL_NEWS_CREATE_FAIL,
    GLOBAL_NEWS_DELETE_REQUEST,
    GLOBAL_NEWS_DELETE_SUCCESS,
    GLOBAL_NEWS_DELETE_FAIL,
    GLOBAL_NEWS_FAIL,
    GLOBAL_NEWS_REQUEST,
    GLOBAL_NEWS_SUCCESS,
    GLOBAL_NEWS_UPDATE_REQUEST,
    GLOBAL_NEWS_UPDATE_SUCCESS,
    GLOBAL_NEWS_UPDATE_FAIL
} from '../constants/newsConstants'
import { getAuthorizedJsonConfig } from '../utils/axiosConfig'

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

export const createGlobalNews = news => async (dispatch, getState) => {
    try {
        dispatch({ type: GLOBAL_NEWS_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.post(
            '/api/news',
            news,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: GLOBAL_NEWS_CREATE_SUCCESS, payload: data })
        dispatch(getGlobalNews())
    } catch (error) {
        dispatch({
            type: GLOBAL_NEWS_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateGlobalNews = news => async (dispatch, getState) => {
    try {
        dispatch({ type: GLOBAL_NEWS_UPDATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.put(
            `/api/news/${news.id}`,
            news,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: GLOBAL_NEWS_UPDATE_SUCCESS, payload: data })
        dispatch(getGlobalNews())
    } catch (error) {
        dispatch({
            type: GLOBAL_NEWS_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteGlobalNews = id => async (dispatch, getState) => {
    try {
        dispatch({ type: GLOBAL_NEWS_DELETE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.delete(
            `/api/news/${id}`,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: GLOBAL_NEWS_DELETE_SUCCESS, payload: data.message })
        dispatch(getGlobalNews())
    } catch (error) {
        dispatch({
            type: GLOBAL_NEWS_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
