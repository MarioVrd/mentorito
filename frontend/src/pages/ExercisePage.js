import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getExerciseDetails } from '../actions/exerciseActions'
import { Grid, Main, Sidebar } from '../assets/styles'
import Alert from '../components/Alert'
import ExerciseItem from '../components/ExerciseItem'
import ExerciseSubmitForm from '../components/ExerciseSubmitForm'
import { EXERCISE_DETAILS_RESET } from '../constants/exerciseConstants'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'

const ExercisePage = ({ location, match }) => {
    const { id } = match.params

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const exerciseDetails = useSelector(state => state.exerciseDetails)
    const { loading, error, exercise } = exerciseDetails

    const [submitId, setSubmitId] = useState(location.search.split('=')[1])
    const [isSubmitted, setIsSubmitted] = useState(true)

    useEffect(() => {
        dispatch(getExerciseDetails(id))
    }, [dispatch, id])

    useEffect(() => {
        setSubmitId(location.search.split('=')[1])
    }, [location.search])

    useEffect(() => {
        if (loading === false && exercise) {
            setIsSubmitted(
                exercise.finishedExercises.some(submit => submit.studentId === userInfo.id)
            )
        }
    }, [loading, exercise, userInfo.id])

    const teacherScreen =
        (userInfo.role === ROLE_TEACHER || userInfo === ROLE_ADMIN) &&
        exercise &&
        exercise.finishedExercises.length > 0 ? (
            submitId ? (
                <ExerciseItem
                    exercise={exercise.finishedExercises.find(
                        finished => finished.studentId === submitId
                    )}
                />
            ) : (
                exercise.finishedExercises.map(finished => (
                    <Link
                        key={finished.studentId}
                        to={location => `${location.pathname}?submit=${finished.studentId}`}
                    >
                        Vjezba studenta {finished.student.firstName} {finished.student.lastName}{' '}
                        (predana {finished.createdAt})
                    </Link>
                ))
            )
        ) : null

    // If user is student show his submitted exercise if he submitted
    // If not submitted exercise, redirect to submission form
    // TODO: Check the deadline
    const studentScreen =
        loading === false ? (
            exercise.finishedExercises.length === 1 && isSubmitted ? (
                <ExerciseItem exercise={exercise.finishedExercises[0]} />
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

    return loading ? (
        'Loading...'
    ) : error ? (
        <Alert>{error}</Alert>
    ) : (
        <Grid>
            <Main>
                <Heading>
                    Vježba '{exercise.title}' iz kolegija {exercise.course.title}
                </Heading>
                {exercise.description && <p>{exercise.description}</p>}

                {
                    // If user is teacher and viewing certain student's submit
                    userInfo.role === ROLE_TEACHER || userInfo.role === ROLE_ADMIN
                        ? teacherScreen
                        : studentScreen
                }

                {/*
                <Route exact path={`/exercises/${params.id}/submission`}>
                    <SubmissionPage />
                </Route>

                <Route path={`/exercises/${params.id}/submission/${id}`}>
                    <ExerciseItem exercise={} />
                </Route> */}
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

const Heading = styled.h2`
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--clr-grey-100);
`

export default ExercisePage
