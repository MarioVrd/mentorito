import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { getExerciseDetails } from '../actions/exerciseActions'
import { Grid, Main, Table } from '../assets/styles'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert'
import ExerciseItem from '../components/ExerciseItem'
import ExerciseSubmitForm from '../components/ExerciseSubmitForm'
import { EXERCISE_DETAILS_RESET } from '../constants/exerciseConstants'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'
import Loader from '../components/Loader'
import ExerciseForm from '../components/ExerciseForm'
import PrivateRoute from '../components/PrivateRoute'
import { STATUS } from '../constants/requestStatusConstants'

const ExercisePage = ({ location, match }) => {
    const { id } = match.params

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const exerciseDetails = useSelector(state => state.exerciseDetails)
    const { status, error, exercise } = exerciseDetails

    const [submitId, setSubmitId] = useState(location.search.split('=')[1])
    const [isSubmitted, setIsSubmitted] = useState(true)

    useEffect(() => {
        dispatch(getExerciseDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        setSubmitId(location.search.split('=')[1])
    }, [location.search])

    useEffect(() => {
        if (status === STATUS.completed && exercise) {
            setIsSubmitted(
                exercise.exerciseSubmissions.some(submit => submit.studentId === userInfo.id)
            )
        }
    }, [status, exercise, userInfo.id])

    const teacherScreen =
        (userInfo?.role === ROLE_TEACHER || userInfo?.role === ROLE_ADMIN) &&
        exercise &&
        exercise.exerciseSubmissions.length > 0 ? (
            submitId ? (
                <ExerciseItem
                    exercise={exercise.exerciseSubmissions.find(
                        finished => finished.studentId === submitId
                    )}
                />
            ) : (
                <Table>
                    <Table.Head>
                        <tr>
                            <td>Student</td>
                            <td className="table-lg-show">Vrijeme predaje</td>
                            <td className="table-md-show">Ocjena</td>
                            <td>Poveznice</td>
                        </tr>
                    </Table.Head>
                    <Table.Body>
                        {exercise.exerciseSubmissions.map(submission => (
                            <tr key={submission.studentId}>
                                <td>
                                    {submission.student.firstName} {submission.student.lastName}
                                </td>
                                <td className="table-lg-show">
                                    {new Date(submission.createdAt).toLocaleString()}
                                </td>
                                <td className="table-md-show">
                                    {submission.grade ? submission.grade : 'Nije ocijenjeno'}
                                </td>
                                <td>
                                    <Link
                                        to={location =>
                                            `${location.pathname}?submit=${submission.studentId}`
                                        }
                                    >
                                        Pregled
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </Table.Body>
                </Table>
            )
        ) : (
            <Alert variant="info">Nema predanih vježbi</Alert>
        )

    // If user is student show his submitted exercise if he submitted
    // If not submitted exercise, show submission form
    const studentScreen =
        status === STATUS.completed ? (
            exercise.exerciseSubmissions.length === 1 && isSubmitted ? (
                <ExerciseItem exercise={exercise.exerciseSubmissions[0]} />
            ) : (
                <ExerciseSubmitForm />
            )
        ) : null

    useEffect(() => {
        return () => {
            dispatch({ type: EXERCISE_DETAILS_RESET })
        }
    }, [dispatch])

    return (
        <Grid>
            <Main>
                {status === STATUS.loading ? (
                    <Loader />
                ) : error ? (
                    <Alert>{error}</Alert>
                ) : (
                    <>
                        <Main.Title>
                            Vježba '{exercise.title}' iz kolegija{' '}
                            <Link to={`/courses/${exercise.course.id}`}>
                                {exercise.course.title}
                            </Link>
                        </Main.Title>

                        <Switch>
                            {userInfo?.role === ROLE_TEACHER && (
                                <PrivateRoute teacher exact path={`/exercises/${id}/edit`}>
                                    <ExerciseForm
                                        type="edit"
                                        exerciseId={id}
                                        currTitle={exercise.title}
                                        currDescription={exercise.description}
                                    />
                                </PrivateRoute>
                            )}

                            <Route exact path={`/exercises/${id}`}>
                                {exercise.description && (
                                    <Main.Description>{exercise.description}</Main.Description>
                                )}

                                {
                                    // If user is teacher and viewing certain student's submit
                                    userInfo.role === ROLE_TEACHER || userInfo.role === ROLE_ADMIN
                                        ? teacherScreen
                                        : studentScreen
                                }
                            </Route>
                        </Switch>
                    </>
                )}
            </Main>
            <Sidebar>
                <p>
                    Rok za predaju:{' '}
                    {exercise.deadline
                        ? new Date(exercise.deadline).toLocaleString()
                        : 'Nije ograničen'}
                </p>
                {userInfo?.role === ROLE_TEACHER && (
                    <div>
                        <h3>Poveznice</h3>
                        <ul>
                            <li>
                                <Link to={`/exercises/${exercise.id}/edit`}>Uredi vježbu</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </Sidebar>
        </Grid>
    )
}

export default ExercisePage
