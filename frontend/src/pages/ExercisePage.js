import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getExerciseDetails } from '../actions/exerciseActions'
import { Grid, Main, Table } from '../assets/styles'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert'
import ExerciseItem from '../components/ExerciseItem'
import ExerciseSubmitForm from '../components/ExerciseSubmitForm'
import { EXERCISE_DETAILS_RESET } from '../constants/exerciseConstants'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'
import Loader from '../components/Loader'

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
        if (status === 'completed' && exercise) {
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
                            <td>Akcije</td>
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
        ) : null

    // If user is student show his submitted exercise if he submitted
    // If not submitted exercise, redirect to submission form
    // TODO: Check the deadline
    const studentScreen =
        status === 'completed' ? (
            exercise.exerciseSubmissions.length === 1 && isSubmitted ? (
                <ExerciseItem exercise={exercise.exerciseSubmissions[0]} />
            ) : (
                <ExerciseSubmitForm />
                // <Redirect push to={`${location.pathname}/submission`} />
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
                {status === 'loading' ? (
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
                        {exercise.description && <p>{exercise.description}</p>}

                        {
                            // If user is teacher and viewing certain student's submit
                            userInfo.role === ROLE_TEACHER || userInfo.role === ROLE_ADMIN
                                ? teacherScreen
                                : studentScreen
                        }
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
            </Sidebar>
        </Grid>
    )
}

export default ExercisePage
