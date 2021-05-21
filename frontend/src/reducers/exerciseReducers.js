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

const initialExerciseDetailsState = { exercise: { exerciseSubmissions: [], course: {} } }

export const exerciseDetailsReducer = (state = initialExerciseDetailsState, action) => {
    switch (action.type) {
        case EXERCISE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case EXERCISE_DETAILS_SUCCESS:
            return { ...state, loading: false, exercise: action.payload }
        case EXERCISE_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        case EXERCISE_DETAILS_RESET:
            return initialExerciseDetailsState
        default:
            return state
    }
}

const initialExerciseSubmitState = { status: 'idle' }
export const exerciseSubmitReducer = (state = initialExerciseSubmitState, action) => {
    switch (action.type) {
        case EXERCISE_SUBMIT_REQUEST:
            return { status: 'loading' }
        case EXERCISE_SUBMIT_SUCCESS:
            return { status: 'completed', submission: action.payload }
        case EXERCISE_SUBMIT_FAIL:
            return { status: 'failed', error: action.payload }
        case EXERCISE_SUBMIT_RESET:
            return initialExerciseSubmitState
        default:
            return state
    }
}

const initialExerciseCreateState = { status: 'idle' }
export const exerciseCreateReducer = (state = initialExerciseCreateState, action) => {
    switch (action.type) {
        case EXERCISE_CREATE_REQUEST:
            return { status: 'loading' }
        case EXERCISE_CREATE_SUCCESS:
            return { status: 'completed', exercise: action.payload }
        case EXERCISE_CREATE_FAIL:
            return { status: 'failed', error: action.payload }
        case EXERCISE_CREATE_RESET:
            return { initialExerciseCreateState }
        default:
            return state
    }
}
