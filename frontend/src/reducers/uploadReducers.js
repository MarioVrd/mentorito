import {
    UPLOAD_FAIL,
    UPLOAD_REQUEST,
    UPLOAD_RESET,
    UPLOAD_SUCCESS
} from '../constants/uploadConstants'
import { STATUS } from '../constants/requestStatusConstants'


const initialState = { status: STATUS.idle }

export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return { status: STATUS.loading }
        case UPLOAD_SUCCESS:
            return { status: STATUS.completed, uploadData: action.payload }
        case UPLOAD_FAIL:
            return { status: STATUS.failed, error: action.payload }
        case UPLOAD_RESET:
            return initialState
        default:
            return state
    }
}
