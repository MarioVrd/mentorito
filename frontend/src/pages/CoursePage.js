import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { enrollToCourse, getCourseDetails } from '../actions/courseActions'
import { Button, Grid, Main, Sidebar } from '../assets/styles'
import Alert from '../components/Alert'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'
import { getFileFromApi } from '../utils/downloadUtils'

const CoursePage = ({ match }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const courseDetails = useSelector(state => state.courseDetails)
    const { status, error, course } = courseDetails

    // Show course page only for enrolled students, teacher and admin
    const enrolled =
        (course && course.enrolledUsers.some(e => e.userId === userInfo.id)) ||
        userInfo.role === ROLE_ADMIN

    const handleEnroll = e => {
        e.preventDefault()

        dispatch(enrollToCourse(course.id))
    }

    const downloadMaterialHandler = async (e, materialUpload) => {
        e.preventDefault()
        await getFileFromApi(materialUpload, userInfo.token)
    }

    useEffect(() => {
        dispatch(getCourseDetails(match.params.id))
    }, [dispatch, match.params.id])

    return status === 'loading' ? (
        'Loading...'
    ) : error ? (
        <Main>
            <Alert>{error}</Alert>
        </Main>
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
                                        {e.deadline
                                            ? new Date(e.deadline).toLocaleString()
                                            : 'Nije ograničen'}
                                        )
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <Alert variant="info">Trenutno nema vjezbi</Alert>
                )}

                {course.materials.length > 0 && (
                    <>
                        <h3>Materijali</h3>
                        <ul>
                            {course.materials.map(material => (
                                <li key={material.uploadId}>
                                    <Link
                                        to=""
                                        onClick={e => downloadMaterialHandler(e, material.upload)}
                                    >
                                        {material.upload.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Main>
            <Sidebar>
                <h3>Upisani studenti</h3>
                <ul>
                    {course.enrolledUsers.map(e => (
                        <li key={`${e.userId}${e.courseId}`}>
                            {e.user.firstName} {new Date(e.enrolledAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>

                {userInfo.role === ROLE_TEACHER && (
                    <>
                        <Link to={`${match.url}/add-exercise`}>Dodajte vjezbu</Link>
                        <Link to={`${match.url}/add-material`}>Dodajte materijale</Link>
                    </>
                )}
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
