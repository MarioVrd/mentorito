import axios from 'axios'
import {
    COURSE_DETAILS_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    ENROLLED_COURSES_LIST_FAIL,
    ENROLLED_COURSES_LIST_REQUEST,
    ENROLLED_COURSES_LIST_SUCCESS,
    ENROLL_TO_COURSE_FAIL,
    ENROLL_TO_COURSE_REQUEST,
    ENROLL_TO_COURSE_SUCCESS
} from '../constants/courseConstants'
import { getAuthorizedJsonConfig } from '../utils/axiosConfig'

export const getEnrolledCourses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ENROLLED_COURSES_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.get(
            '/api/courses/enrolled',
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: ENROLLED_COURSES_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ENROLLED_COURSES_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getAllCourses = () => async dispatch => {
    try {
        dispatch({ type: COURSE_LIST_REQUEST })

        const { data } = await axios.get('/api/courses')

        dispatch({ type: COURSE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: COURSE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const enrollToCourse =
    (courseId, userId = undefined) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: ENROLL_TO_COURSE_REQUEST })

            const {
                userLogin: { userInfo }
            } = getState()

            const { data } = await axios.post(
                '/api/courses/enroll',
                { courseId, userId },
                getAuthorizedJsonConfig(userInfo.token)
            )

            dispatch({ type: ENROLL_TO_COURSE_SUCCESS, payload: data.message })
        } catch (error) {
            dispatch({
                type: ENROLL_TO_COURSE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
            })
        }
    }

export const getCourseDetails = courseId => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.get(
            `/api/courses/${courseId}`,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
