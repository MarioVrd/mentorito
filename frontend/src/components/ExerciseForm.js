import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createExercise, getExerciseDetails } from '../actions/exerciseActions'
import { Button, Form } from '../assets/styles'
import Alert from './Alert'
import PropTypes from 'prop-types'
import { EXERCISE_CREATE_RESET } from '../constants/exerciseConstants'
import useApi from '../hooks/useApi'
import { STATUS } from '../constants/requestStatusConstants'

const ExerciseForm = ({ type, exerciseId, currTitle, currDescription }) => {
    const { id: courseId } = useParams()
    const [title, setTitle] = useState(currTitle || '')
    const [description, setDescription] = useState(currDescription || '')
    const [deadline, setDeadline] = useState('')

    const history = useHistory()

    const dispatch = useDispatch()
    const exerciseCreate = useSelector(state => state.exerciseCreate)
    const { exercise, status, error } = exerciseCreate

    const api = useApi()
    const { status: apiStatus, error: apiError, apiFunction } = api

    const addExerciseHandler = e => {
        e.preventDefault()

        dispatch(createExercise({ title, description, deadline, courseId }))
    }

    const updateExerciseHandler = e => {
        e.preventDefault()

        const data = { title, description }
        if (deadline) data.deadline = deadline

        apiFunction('PUT', `/api/exercises/${exerciseId}`, data)
    }

    useEffect(() => {
        if (status === STATUS.completed) history.push(`/exercises/${exercise.id}`)
    }, [history, exercise?.id, status])

    useEffect(() => {
        if (apiStatus === STATUS.completed) {
            dispatch(getExerciseDetails(exerciseId))
            history.push(`/exercises/${exerciseId}`)
        }
    }, [history, exerciseId, dispatch, apiStatus])

    useEffect(() => {
        return () => {
            dispatch({ type: EXERCISE_CREATE_RESET })
        }
    }, [dispatch])

    return (
        <Form onSubmit={type === 'create' ? addExerciseHandler : updateExerciseHandler}>
            <Form.Title>{type === 'create' ? 'Nova vježba' : 'Uredi vježbu'}</Form.Title>
            {error && <Alert>{error}</Alert>}
            {apiError && <Alert>{apiError}</Alert>}
            <Form.Group>
                <Form.Label htmlFor="title">Naziv</Form.Label>
                <Form.Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="description">Opis</Form.Label>
                <Form.Textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></Form.Textarea>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="deadline">Rok za predaju</Form.Label>
                <Form.Input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
            </Form.Group>
            <Button primary>{type === 'create' ? 'Dodaj' : 'Uredi'}</Button>
        </Form>
    )
}

ExerciseForm.defaultProps = {
    type: 'create'
}

ExerciseForm.propTypes = {
    type: PropTypes.string.isRequired
}

export default ExerciseForm
