import axios from 'axios'
import {
    ENROLLED_COURSES_LIST_FAIL,
    ENROLLED_COURSES_LIST_REQUEST,
    ENROLLED_COURSES_LIST_SUCCESS
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
