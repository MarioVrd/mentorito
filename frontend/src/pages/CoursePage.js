import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { getCourseDetails, getEnrolledCourses, updateCourse } from '../actions/courseActions'
import { Button, Grid, LinkButton, Main } from '../assets/styles'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert'
import CourseStudents from '../components/CourseStudents'
import PrivateRoute from '../components/PrivateRoute'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'
import { getFileFromApi } from '../utils/downloadUtils'
import ExerciseForm from '../components/ExerciseForm'
import AddMaterialForm from '../components/AddMaterialForm'
import CourseNewsForm from '../components/CourseNewsForm'
import CourseNewsList from '../components/CourseNewsList'
import CourseNewsItem from '../components/CourseNewsItem'
import Loader from '../components/Loader'
import NewsItem from '../components/NewsItem'
import { COURSE_DETAILS_RESET } from '../constants/courseConstants'
import useApi from '../hooks/useApi'
import { STATUS } from '../constants/requestStatusConstants'

const CoursePage = ({ match, history }) => {
    const [isMounted, setIsMounted] = useState(true)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const courseDetails = useSelector(state => state.courseDetails)
    const { status, error, course } = courseDetails
    const courseUpdate = useSelector(state => state.courseUpdate)
    const { status: updateStatus } = courseUpdate

    const api = useApi()
    const { status: apiStatus, error: apiError, apiFunction } = api

    const unenroll = useApi()
    const {
        status: unenrollStatus,
        error: unenrollError,
        apiFunction: unenrollApiFunction
    } = unenroll

    const downloadMaterialHandler = async (e, materialUpload) => {
        e.preventDefault()
        await getFileFromApi(materialUpload, userInfo.token)
    }

    const toggleSelfEnrollment = e => {
        e.preventDefault()

        dispatch(updateCourse(course.id, { locked: !course.locked }))
    }

    const unenrollMe = () => {
        unenrollApiFunction('DELETE', `/api/courses/${match.params.id}/enroll/${userInfo.id}`)
    }

    useEffect(() => {
        if (match.params.id) dispatch(getCourseDetails(match.params.id))
    }, [dispatch, match.params.id, apiStatus])

    useEffect(() => {
        if (updateStatus === STATUS.completed) dispatch(getCourseDetails(match.params.id))
    }, [updateStatus, dispatch, match.params.id])

    useEffect(() => {
        if (unenrollStatus === STATUS.completed && isMounted) {
            dispatch(getEnrolledCourses())
            history.push('/courses')
        }
    }, [history, dispatch, unenrollStatus, isMounted])

    useEffect(() => {
        return () => {
            setIsMounted(false)
            dispatch({ type: COURSE_DETAILS_RESET })
        }
    }, [dispatch])

    return status === STATUS.loading ? (
        <Loader />
    ) : error ? (
        <Main>
            <Alert>{error}</Alert>
        </Main>
    ) : (
        <Switch>
            <Grid>
                <Main>
                    <Main.Title>
                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    </Main.Title>

                    {userInfo?.role === ROLE_TEACHER && (
                        <>
                            <PrivateRoute
                                teacher
                                exact
                                path={`/courses/:id/news/:newsId/edit`}
                                component={CourseNewsForm}
                            />
                            <PrivateRoute
                                teacher
                                exact
                                path="/courses/:id/add-news"
                                component={CourseNewsForm}
                            />
                            <PrivateRoute
                                teacher
                                exact
                                path="/courses/:id/add-material"
                                component={AddMaterialForm}
                            />
                            <PrivateRoute teacher exact path="/courses/:id/add-exercise">
                                <ExerciseForm type="create" />
                            </PrivateRoute>
                            <PrivateRoute
                                teacher
                                exact
                                path="/courses/:id/students"
                                component={CourseStudents}
                            />
                        </>
                    )}

                    <Route exact path={`${match.path}/news/:newsId`} component={CourseNewsItem} />
                    <Route exact path={`${match.path}/news`} component={CourseNewsList} />

                    <Route exact path={match.path}>
                        {course.description && (
                            <Main.Description>{course.description}</Main.Description>
                        )}

                        {unenrollError && <Alert>{unenrollError}</Alert>}

                        {course.news?.length > 0 ? (
                            <>
                                {apiError && <Alert>{apiError}</Alert>}
                                {course.news.map(n => (
                                    <NewsItem
                                        key={n.id}
                                        news={n}
                                        canModify={userInfo?.role === ROLE_TEACHER}
                                        url={`${match.url}/news/${n.id}`}
                                        deleteHandler={() =>
                                            apiFunction('DELETE', `/api/${match.url}/news/${n.id}`)
                                        }
                                    />
                                ))}
                            </>
                        ) : (
                            <Alert variant="info">Trenutno nema obavijesti</Alert>
                        )}

                        {course.exercises?.length > 0 ? (
                            <section>
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
                                            {userInfo?.role === ROLE_TEACHER && (
                                                <>
                                                    <LinkButton
                                                        size="small"
                                                        variant="success"
                                                        to={`/exercises/${e.id}/edit`}
                                                    >
                                                        Uredi
                                                    </LinkButton>
                                                    <Button
                                                        small
                                                        danger
                                                        onClick={() =>
                                                            apiFunction(
                                                                'DELETE',
                                                                `/api/exercises/${e.id}`
                                                            )
                                                        }
                                                    >
                                                        Izbriši
                                                    </Button>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ) : (
                            <Alert variant="info">Trenutno nema vježbi</Alert>
                        )}

                        {course.materials?.length > 0 && (
                            <section>
                                <h3>Materijali</h3>
                                <ul>
                                    {course.materials.map(material => (
                                        <li key={material.uploadId}>
                                            <Link
                                                to=""
                                                onClick={e =>
                                                    downloadMaterialHandler(e, material.upload)
                                                }
                                            >
                                                {material.upload.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </Route>
                </Main>
                <Sidebar>
                    <div>
                        <h3>Upisani u kolegij</h3>
                        <ul>
                            {course.enrolledUsers.map(e => (
                                <li key={`${e.userId}${e.courseId}`}>
                                    {e.user.firstName} {e.user.lastName}
                                    {e.user.role === ROLE_TEACHER && <strong>, profesor</strong>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>Poveznice</h3>
                        <ul>
                            <li>
                                <Link to={`${match.url}/news`}>Pregled obavijesti</Link>
                            </li>
                            {userInfo?.role === ROLE_TEACHER && (
                                <>
                                    <li>
                                        <Link to={`${match.url}/add-news`}>Dodajte obavijest</Link>
                                    </li>
                                    <li>
                                        <Link to={`${match.url}/add-exercise`}>Dodajte vježbu</Link>
                                    </li>
                                    <li>
                                        <Link to={`${match.url}/add-material`}>
                                            Dodajte materijale
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`${match.url}/students`}>Pregled studenata</Link>
                                    </li>
                                    <li>
                                        <Link to="" onClick={toggleSelfEnrollment}>
                                            {course.locked ? 'Omogući' : 'Onemogući'} samostalni
                                            upis
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li>
                                <Link to="" onClick={unenrollMe}>
                                    Ispis iz kolegija
                                </Link>
                            </li>

                            {userInfo?.role === ROLE_ADMIN && (
                                <li>
                                    <Link to={`/admin${match.url}/edit`}>Uredi kolegij</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </Sidebar>
            </Grid>
        </Switch>
    )
}

export default CoursePage
