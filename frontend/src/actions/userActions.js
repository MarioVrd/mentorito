import axios from 'axios'
import { contentTypeJson, getAuthorizedJsonConfig } from '../utils/axiosConfig'
import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from '../constants/userConstants'

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const { data } = await axios.post('/api/users/login', { email, password }, contentTypeJson)

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const getUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.get(`/api/users`, getAuthorizedJsonConfig(userInfo.token))

        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
