import {
    COURSE_CREATE_FAIL,
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_RESET,
    COURSE_CREATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_RESET,
    COURSE_UPDATE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_DELETE_REQUEST,
    COURSE_DELETE_RESET,
    COURSE_DELETE_SUCCESS,
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
    ENROLL_TO_COURSE_SUCCESS,
    COURSE_DETAILS_RESET,
    COURSE_MATERIAL_ADD_SUCCESS,
    COURSE_MATERIAL_ADD_REQUEST,
    COURSE_MATERIAL_ADD_FAIL,
    COURSE_MATERIAL_ADD_RESET
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

export const courseEnrollReducer = (state = { status: 'idle' }, action) => {
    switch (action.type) {
        case ENROLL_TO_COURSE_REQUEST:
            return { status: 'loading' }
        case ENROLL_TO_COURSE_SUCCESS:
            return { status: 'completed', enrollment: action.payload }
        case ENROLL_TO_COURSE_FAIL:
            return { status: 'failed', error: action.payload }
        case ENROLL_TO_COURSE_RESET:
            return { status: 'idle' }
        default:
            return state
    }
}

const initialCourseDetails = {
    status: 'idle',
    course: { news: [], exercises: [], enrolledUsers: [] }
}
export const courseDetailsReducer = (state = initialCourseDetails, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return { status: 'loading' }
        case COURSE_DETAILS_SUCCESS:
            return { status: 'completed', course: action.payload }
        case COURSE_DETAILS_FAIL:
            return { status: 'failed', error: action.payload }
        case COURSE_DETAILS_RESET:
            return initialCourseDetails
        default:
            return state
    }
}

export const courseCreateReducer = (state = { status: 'idle' }, action) => {
    switch (action.type) {
        case COURSE_CREATE_REQUEST:
            return { status: 'loading' }
        case COURSE_CREATE_SUCCESS:
            return { status: 'completed', course: action.payload }
        case COURSE_CREATE_FAIL:
            return { status: 'failed', error: action.payload }
        case COURSE_CREATE_RESET:
            return { status: 'idle' }
        default:
            return state
    }
}

export const courseUpdateReducer = (state = { status: 'idle' }, action) => {
    switch (action.type) {
        case COURSE_UPDATE_REQUEST:
            return { status: 'loading' }
        case COURSE_UPDATE_SUCCESS:
            return { status: 'completed', course: action.payload }
        case COURSE_UPDATE_FAIL:
            return { status: 'failed', error: action.payload }
        case COURSE_UPDATE_RESET:
            return { status: 'idle' }
        default:
            return state
    }
}

export const courseDeleteReducer = (state = { status: 'idle' }, action) => {
    switch (action.type) {
        case COURSE_DELETE_REQUEST:
            return { status: 'loading' }
        case COURSE_DELETE_SUCCESS:
            return { status: 'completed', message: action.payload }
        case COURSE_DELETE_FAIL:
            return { status: 'failed', error: action.payload }
        case COURSE_DELETE_RESET:
            return { status: 'idle' }
        default:
            return state
    }
}

export const courseMaterialAddReducer = (state = { status: 'idle' }, action) => {
    switch (action.type) {
        case COURSE_MATERIAL_ADD_REQUEST:
            return { status: 'loading' }
        case COURSE_MATERIAL_ADD_SUCCESS:
            return { status: 'completed', material: action.payload }
        case COURSE_MATERIAL_ADD_FAIL:
            return { status: 'failed', error: action.payload }
        case COURSE_MATERIAL_ADD_RESET:
            return { status: 'idle' }
        default:
            return state
    }
}
