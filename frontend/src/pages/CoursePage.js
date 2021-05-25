import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { getCourseDetails } from '../actions/courseActions'
import { Grid, Main, Sidebar } from '../assets/styles'
import Alert from '../components/Alert'
import CourseStudents from '../components/CourseStudents'
import PrivateRoute from '../components/PrivateRoute'
import { ROLE_TEACHER } from '../constants/roles'
import { getFileFromApi } from '../utils/downloadUtils'
import CreateExerciseForm from '../components/CreateExerciseForm'
import AddMaterialPage from '../components/AddMaterialForm'

const CoursePage = ({ match }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const courseDetails = useSelector(state => state.courseDetails)
    const { status, error, course } = courseDetails

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
    ) : (
        <Switch>
            <Grid>
                <Main>
                    {userInfo.role === ROLE_TEACHER && (
                        <>
                            <PrivateRoute
                                teacher
                                exact
                                path="/courses/:id/add-material"
                                component={AddMaterialPage}
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

                    <Route exact path={match.path}>
                        <h1>{course.title}</h1>

                        {course.description && <p>{course.description}</p>}

                        {course.news.length > 0 ? (
                            course.news.map(n => <p key={n.id}>{n.title}</p>)
                        ) : (
                            <Alert variant="info">Trenutno nema obavijesti</Alert>
                        )}

                        {course.exercises.length > 0 ? (
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
                                                onClick={e =>
                                                    downloadMaterialHandler(e, material.upload)
                                                }
                                            >
                                                {material.upload.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Route>
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
                            <h3>Akcije</h3>
                            <ul>
                                <li>
                                    <Link to={`${match.url}/add-exercise`}>Dodajte vjezbu</Link>
                                </li>
                                <li>
                                    <Link to={`${match.url}/add-material`}>Dodajte materijale</Link>
                                </li>
                                <li>
                                    <Link to={`${match.url}/students`}>Pregled studenata</Link>
                                </li>
                            </ul>
                        </>
                    )}
                </Sidebar>
            </Grid>
        </Switch>
    )
}

export default CoursePage
