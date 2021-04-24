import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { enrollToCourse, getCourseDetails } from '../actions/courseActions'
import { Button, Grid, Main, Sidebar } from '../assets/styles'
import Alert from '../components/Alert'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'

const CoursePage = () => {
    const match = useRouteMatch()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const courseDetails = useSelector(state => state.courseDetails)
    const { loading, error, course } = courseDetails

    // Show course page only for enrolled students, teacher and admin
    const enrolled =
        (course && course.studentsEnrolled.some(e => e.userId === userInfo.id)) ||
        userInfo.role === ROLE_TEACHER ||
        userInfo.role === ROLE_ADMIN

    const handleEnroll = e => {
        e.preventDefault()

        dispatch(enrollToCourse(course.id))
    }

    useEffect(() => {
        dispatch(getCourseDetails(match.params.id))
    }, [dispatch, match.params.id])

    return loading ? (
        'Loading...'
    ) : error ? (
        <Alert>{error}</Alert>
    ) : enrolled ? (
        <Grid>
            <Main>
                <h1>{course.title}</h1>

                {course.description && <p>{course.description}</p>}

                {course.news && course.news.length ? (
                    course.news.map(n => <p key={n.id}>{n.title}</p>)
                ) : (
                    <Alert variant="info">Trenutno nema obavijesti</Alert>
                )}

                {course.exercises && course.exercises.length ? (
                    <>
                        <h3>Vježbe</h3>
                        <ul>
                            {course.exercises.map(e => (
                                <li key={e.id}>
                                    <Link to={`/exercises/${e.id}`}>
                                        {e.title} (rok za predaju:{' '}
                                        {new Date(e.deadline).toLocaleString()})
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <Alert variant="info">Trenutno nema vjezbi</Alert>
                )}
            </Main>
            <Sidebar>
                <h3>Upisani studenti</h3>
                <ul>
                    {course.studentsEnrolled.map(e => (
                        <li key={`${e.userId}${e.courseId}`}>
                            {e.user.firstName} {new Date(e.enrolledAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </Sidebar>
        </Grid>
    ) : (
        <Main>
            <p>Niste upisani u ovaj kolegij.</p>
            <Button onClick={handleEnroll} disabled={course.locked}>
                Upis {course.locked && 'onemogućen'}
            </Button>
        </Main>
    )
}

export default CoursePage
