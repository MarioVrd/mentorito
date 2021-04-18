import {
    ENROLLED_COURSES_LIST_FAIL,
    ENROLLED_COURSES_LIST_REQUEST,
    ENROLLED_COURSES_LIST_SUCCESS
} from '../constants/courseConstants'

export const enrolledCoursesReducer = (state = {}, action) => {
    switch (action.type) {
        case ENROLLED_COURSES_LIST_REQUEST:
            return { loading: true }
        case ENROLLED_COURSES_LIST_SUCCESS:
            return { loading: false, enrollment: action.payload }
        case ENROLLED_COURSES_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
