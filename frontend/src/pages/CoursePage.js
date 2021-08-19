import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { getCourseDetails, updateCourse } from '../actions/courseActions'
import { Grid, Main } from '../assets/styles'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert'
import CourseStudents from '../components/CourseStudents'
import PrivateRoute from '../components/PrivateRoute'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'
import { getFileFromApi } from '../utils/downloadUtils'
import CreateExerciseForm from '../components/CreateExerciseForm'
import AddMaterialForm from '../components/AddMaterialForm'
import CourseNewsForm from '../components/CourseNewsForm'
import CourseNewsList from '../components/CourseNewsList'
import CourseNewsItem from '../components/CourseNewsItem'
import Loader from '../components/Loader'
import NewsItem from '../components/NewsItem'

const CoursePage = ({ match }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const courseDetails = useSelector(state => state.courseDetails)
    const { status, error, course } = courseDetails
    const courseUpdate = useSelector(state => state.courseUpdate)
    const { status: updateStatus } = courseUpdate

    const downloadMaterialHandler = async (e, materialUpload) => {
        e.preventDefault()
        await getFileFromApi(materialUpload, userInfo.token)
    }

    const toggleSelfEnrollment = e => {
        e.preventDefault()

        dispatch(updateCourse(course.id, { locked: !course.locked }))
    }

    useEffect(() => {
        dispatch(getCourseDetails(match.params.id))
    }, [dispatch, match.params.id])

    useEffect(() => {
        if (updateStatus === 'completed') dispatch(getCourseDetails(match.params.id))
    }, [updateStatus, dispatch, match.params.id])

    return status === 'loading' ? (
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
                            <PrivateRoute
                                teacher
                                exact
                                path="/courses/:id/add-exercise"
                                component={CreateExerciseForm}
                            />
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
                        {course.description && <p>{course.description}</p>}

                        {course.news.length > 0 ? (
                            course.news.map(n => (
                                <NewsItem
                                    key={n.id}
                                    news={n}
                                    canModify={userInfo?.role === ROLE_TEACHER}
                                    url={`${match.url}/news/${n.id}`}
                                />
                            ))
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
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ) : (
                            <Alert variant="info">Trenutno nema vježbi</Alert>
                        )}

                        {course.materials.length > 0 && (
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
                        <h3>Linkovi</h3>
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
