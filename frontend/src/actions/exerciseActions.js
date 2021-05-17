import axios from 'axios'
import {
    EXERCISE_CREATE_FAIL,
    EXERCISE_CREATE_REQUEST,
    EXERCISE_CREATE_SUCCESS,
    EXERCISE_DETAILS_FAIL,
    EXERCISE_DETAILS_REQUEST,
    EXERCISE_DETAILS_SUCCESS,
    EXERCISE_SUBMIT_FAIL,
    EXERCISE_SUBMIT_REQUEST,
    EXERCISE_SUBMIT_SUCCESS
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

export const submitExercise = submission => async (dispatch, getState) => {
    try {
        dispatch({ type: EXERCISE_SUBMIT_REQUEST })

        const {
            userLogin: { userInfo },
            exerciseDetails: { exercise }
        } = getState()

        let response

        if (exercise.finishedExercises.length === 0) {
            response = await axios.post(
                `/api/exercises/${exercise.id}/submit`,
                submission,
                getAuthorizedJsonConfig(userInfo.token)
            )
        } else {
            response = await axios.put(
                `/api/exercises/${exercise.id}/submit`,
                submission,
                getAuthorizedJsonConfig(userInfo.token)
            )
        }

        const { data } = response

        dispatch({ type: EXERCISE_SUBMIT_SUCCESS, payload: data })
        dispatch(getExerciseDetails(exercise.id))
    } catch (error) {
        dispatch({
            type: EXERCISE_SUBMIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createExercise = exercise => async (dispatch, getState) => {
    try {
        dispatch({ type: EXERCISE_CREATE_REQUEST })
        const {
            userLogin: { userInfo }
        } = getState()

        const { data } = await axios.post(
            '/api/exercises',
            exercise,
            getAuthorizedJsonConfig(userInfo.token)
        )

        dispatch({ type: EXERCISE_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: EXERCISE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
