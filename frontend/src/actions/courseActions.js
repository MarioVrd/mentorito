import axios from 'axios'
import {
    COURSE_CREATE_FAIL,
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
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
    ENROLL_TO_COURSE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_DELETE_REQUEST,
    COURSE_DELETE_SUCCESS,
    COURSE_MATERIAL_ADD_FAIL,
    COURSE_MATERIAL_ADD_REQUEST,
    COURSE_MATERIAL_ADD_SUCCESS,
    COURSE_NEWS_LIST_REQUEST,
    COURSE_NEWS_LIST_SUCCESS,
    COURSE_NEWS_LIST_FAIL
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

            dispatch({ type: ENROLL_TO_COURSE_SUCCESS, payload: data })
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

export const createCourse = course => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.post(
            '/api/courses',
            course,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: COURSE_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: COURSE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateCourse = (courseId, course) => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_UPDATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.put(
            `/api/courses/${courseId}`,
            course,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: COURSE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteCourse = courseId => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_DELETE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.delete(
            `/api/courses/${courseId}`,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: COURSE_DELETE_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({
            type: COURSE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const addCourseMaterial = (courseId, material) => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_MATERIAL_ADD_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.post(
            `/api/courses/${courseId}/materials`,
            material,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: COURSE_MATERIAL_ADD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: COURSE_MATERIAL_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getCourseNews = courseId => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_NEWS_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.get(
            `/api/courses/${courseId}/news`,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: COURSE_NEWS_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: COURSE_NEWS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
