import {
    EXERCISE_DETAILS_FAIL,
    EXERCISE_DETAILS_REQUEST,
    EXERCISE_DETAILS_RESET,
    EXERCISE_DETAILS_SUCCESS,
    EXERCISE_SUBMIT_FAIL,
    EXERCISE_SUBMIT_REQUEST,
    EXERCISE_SUBMIT_SUCCESS,
    EXERCISE_SUBMIT_RESET,
    EXERCISE_CREATE_REQUEST,
    EXERCISE_CREATE_SUCCESS,
    EXERCISE_CREATE_FAIL,
    EXERCISE_CREATE_RESET
} from '../constants/exerciseConstants'
import { STATUS } from '../constants/requestStatusConstants'

const initialExerciseDetailsState = {
    status: STATUS.idle,
    exercise: { exerciseSubmissions: [], course: {} }
}

export const exerciseDetailsReducer = (state = initialExerciseDetailsState, action) => {
    switch (action.type) {
        case EXERCISE_DETAILS_REQUEST:
            return { ...state, status: STATUS.loading }
        case EXERCISE_DETAILS_SUCCESS:
            return { status: STATUS.completed, exercise: action.payload }
        case EXERCISE_DETAILS_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case EXERCISE_DETAILS_RESET:
            return initialExerciseDetailsState
        default:
            return state
    }
}

const initialExerciseSubmitState = { status: STATUS.idle }
export const exerciseSubmitReducer = (state = initialExerciseSubmitState, action) => {
    switch (action.type) {
        case EXERCISE_SUBMIT_REQUEST:
            return { status: STATUS.loading }
        case EXERCISE_SUBMIT_SUCCESS:
            return { status: STATUS.completed, submission: action.payload }
        case EXERCISE_SUBMIT_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case EXERCISE_SUBMIT_RESET:
            return initialExerciseSubmitState
        default:
            return state
    }
}

const initialExerciseCreateState = { status: STATUS.idle }
export const exerciseCreateReducer = (state = initialExerciseCreateState, action) => {
    switch (action.type) {
        case EXERCISE_CREATE_REQUEST:
            return { status: STATUS.loading }
        case EXERCISE_CREATE_SUCCESS:
            return { status: STATUS.completed, exercise: action.payload }
        case EXERCISE_CREATE_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case EXERCISE_CREATE_RESET:
            return { initialExerciseCreateState }
        default:
            return state
    }
}
