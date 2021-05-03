import {
    EXERCISE_DETAILS_FAIL,
    EXERCISE_DETAILS_REQUEST,
    EXERCISE_DETAILS_RESET,
    EXERCISE_DETAILS_SUCCESS
} from '../constants/exerciseConstants'

const initialExerciseDetailsState = { exercise: { finishedExercises: [], course: {} } }

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
