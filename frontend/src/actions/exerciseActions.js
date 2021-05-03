import axios from 'axios'
import {
    EXERCISE_DETAILS_FAIL,
    EXERCISE_DETAILS_REQUEST,
    EXERCISE_DETAILS_SUCCESS
} from '../constants/exerciseConstants'
import { getAuthorizedJsonConfig } from '../utils/axiosConfig'

export const getExerciseDetails = exerciseId => async (dispatch, getState) => {
    try {
        dispatch({ type: EXERCISE_DETAILS_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.get(
            `/api/exercises/${exerciseId}`,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: EXERCISE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: EXERCISE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
