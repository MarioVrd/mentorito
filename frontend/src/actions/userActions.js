import axios from 'axios'
import { contentTypeJson, getAuthorizedJsonConfig } from '../utils/axiosConfig'
import {
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_NOTIFICATIONS_FAIL,
    USER_NOTIFICATIONS_REQUEST,
    USER_NOTIFICATIONS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from '../constants/userConstants'
import { ROLE_STUDENT } from '../constants/roles'

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

export const getUsers = role => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.get(
            `/api/users${role ? `?role=${role}` : ''}`,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const register =
    (firstName, lastName, email, password, role) => async (dispatch, getState) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST })

            const {
                userLogin: { userInfo }
            } = getState()

            const { data } = await axios.post(
                '/api/users/register',
                { firstName, lastName, email, password, role },
                getAuthorizedJsonConfig(userInfo.token)
            )

            dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            })
        }
    }

export const updateMyAccount =
    (firstName, lastName, oldPassword, newPassword) => async (dispatch, getState) => {
        const {
            userLogin: { userInfo }
        } = getState()

        try {
            dispatch({ type: USER_UPDATE_REQUEST })

            const { data } = await axios.put(
                '/api/users/me',
                { firstName, lastName, oldPassword, newPassword },
                getAuthorizedJsonConfig(userInfo.token)
            )

            dispatch({ type: USER_UPDATE_SUCCESS, payload: data })

            // Login with new data to refresh userInfo
            dispatch(login(data.email, newPassword?.length > 0 ? newPassword : oldPassword))
        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            })
        }
    }

export const getUserNotifications = () => async (dispatch, getState) => {
    const {
        userLogin: { userInfo }
    } = getState()

    if (userInfo?.role !== ROLE_STUDENT) return

    try {
        dispatch({ type: USER_NOTIFICATIONS_REQUEST })

        const { data } = await axios.get(
            '/api/users/notifications',
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: USER_NOTIFICATIONS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_NOTIFICATIONS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
