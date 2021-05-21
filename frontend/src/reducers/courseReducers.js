import {
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
    ENROLL_TO_COURSE_RESET,
    ENROLL_TO_COURSE_SUCCESS
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

export const courseListReducer = (state = {}, action) => {
    switch (action.type) {
        case COURSE_LIST_REQUEST:
            return { loading: true }
        case COURSE_LIST_SUCCESS:
            return { loading: false, courses: action.payload }
        case COURSE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const courseEnrollReducer = (state = {}, action) => {
    switch (action.type) {
        case ENROLL_TO_COURSE_REQUEST:
            return { loading: true }
        case ENROLL_TO_COURSE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case ENROLL_TO_COURSE_FAIL:
            return { loading: false, error: action.payload }
        case ENROLL_TO_COURSE_RESET:
            return {}
        default:
            return state
    }
}

export const courseDetailsReducer = (
    state = { course: { news: [], exercises: [], enrolledUsers: [] } },
    action
) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return { loading: true }
        case COURSE_DETAILS_SUCCESS:
            return { loading: false, course: action.payload }
        case COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
