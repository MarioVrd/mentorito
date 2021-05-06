import {
    UPLOAD_FAIL,
    UPLOAD_REQUEST,
    UPLOAD_RESET,
    UPLOAD_SUCCESS
} from '../constants/uploadConstants'

const initialState = { status: 'idle' }

export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return { status: 'loading' }
        case UPLOAD_SUCCESS:
            return { status: 'completed', uploadData: action.payload }
        case UPLOAD_FAIL:
            return { status: 'failed', error: action.payload }
        case UPLOAD_RESET:
            return initialState
        default:
            return state
    }
}
