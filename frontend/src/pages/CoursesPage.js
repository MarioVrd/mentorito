import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../actions/courseActions'
import { Grid, Main, Sidebar } from '../assets/styles'
import { ROLE_ADMIN } from '../constants/roles'
import Alert from '../components/Alert'
import CourseItem from '../components/CourseItem'
import { COURSE_DELETE_RESET, ENROLL_TO_COURSE_RESET } from '../constants/courseConstants'

const CoursesPage = ({ match: { path }, history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses } = courseList

    const courseEnroll = useSelector(state => state.courseEnroll)
    const { status: enrollStatus, error: enrollError, enrollment } = courseEnroll

    const courseDelete = useSelector(state => state.courseDelete)
    const { status: deleteStatus, error: deleteError, message: deleteMessage } = courseDelete

    useEffect(() => {
        if (enrollStatus === 'completed') {
            history.push(`/courses/${enrollment.courseId}`)
            dispatch({ type: ENROLL_TO_COURSE_RESET })
        }
    }, [dispatch, history, enrollStatus, enrollment?.courseId])

    useEffect(() => {
        if (deleteStatus === 'completed') {
            dispatch(getAllCourses())
        }
    }, [dispatch, deleteStatus])

    useEffect(() => {
        dispatch(getAllCourses())

        return () => {
            dispatch({ type: COURSE_DELETE_RESET })
        }
    }, [dispatch])

    return (
        <Grid>
            <Main>
                <h1>Kolegiji</h1>
                {enrollError && <Alert>{enrollError}</Alert>}
                {deleteError && <Alert>{deleteError}</Alert>}
                {deleteMessage && <Alert variant="success">{deleteMessage}</Alert>}
                {loading ? (
                    'Loading...'
                ) : error ? (
                    <Alert>{error}</Alert>
                ) : courses && courses.length ? (
                    courses.map(course => <CourseItem key={course.id} course={course} />)
                ) : (
                    <Alert variant="info">Trenutno ne postoji ni jedan kolegij.</Alert>
                )}
            </Main>
            <Sidebar>
                {userInfo?.role === ROLE_ADMIN && (
                    <Link to="/admin/courses/create">Kreiraj kolegij</Link>
                )}
            </Sidebar>
        </Grid>
    )
}

export default CoursesPage
