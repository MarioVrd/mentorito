import axios from 'axios'
import { useCallback, useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { API_REQUEST, API_SUCCESS, API_FAIL, API_FUNCTION } from '../constants/apiConstants'
import { getAuthorizedJsonConfig } from '../utils/axiosConfig'
import { STATUS } from '../constants/requestStatusConstants'

const apiReducer = (state, action) => {
    switch (action.type) {
        case API_FUNCTION:
            return { ...state, apiFunction: action.function }
        case API_REQUEST:
            return { ...state, status: STATUS.loading }
        case API_SUCCESS:
            return { ...state, status: STATUS.completed, data: action.payload }
        case API_FAIL:
            return { apiFunction: state.apiFunction, status: STATUS.failed, error: action.payload }
        default:
            return state
    }
}

const useApi = () => {
    const [state, dispatch] = useReducer(apiReducer, { status: STATUS.idle })

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const fetch = useCallback(
        async (method, url, data, auth = true) => {
            try {
                dispatch({ type: API_REQUEST })

                const config = auth ? getAuthorizedJsonConfig(userInfo.token) : {}

                let response

                if (method.toUpperCase() === 'GET') {
                    response = await axios.get(url, config)
                } else if (method.toUpperCase() === 'POST') {
                    response = await axios.post(url, data, config)
                } else if (method.toUpperCase() === 'PUT') {
                    response = await axios.put(url, data, config)
                } else if (method.toUpperCase() === 'DELETE') {
                    response = await axios.delete(url, config)
                } else {
                    throw new Error('Nepravilan zahtjev!')
                }

                dispatch({ type: API_SUCCESS, payload: response.data })
            } catch (error) {
                dispatch({
                    type: API_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                })
            }
        },
        [userInfo?.token]
    )

    useEffect(() => {
        dispatch({ type: API_FUNCTION, function: fetch })
    }, [fetch])

    return state
}

export default useApi
