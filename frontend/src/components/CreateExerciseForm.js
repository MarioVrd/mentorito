import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router'
import { createExercise } from '../actions/exerciseActions'
import { Button, Form } from '../assets/styles'
import Alert from './Alert'
import { EXERCISE_CREATE_RESET } from '../constants/exerciseConstants'

const CreateExerciseForm = () => {
    const { id: courseId } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')

    const dispatch = useDispatch()
    const exerciseCreate = useSelector(state => state.exerciseCreate)
    const { exercise, status, error } = exerciseCreate

    const addExerciseHandler = e => {
        e.preventDefault()

        dispatch(createExercise({ title, description, deadline, courseId }))
    }

    useEffect(() => {
        return () => {
            dispatch({ type: EXERCISE_CREATE_RESET })
        }
    }, [dispatch])

    return status === 'completed' ? (
        <Redirect push to={`/exercises/${exercise.id}`} />
    ) : (
        <Form onSubmit={addExerciseHandler}>
            <Form.Title>Nova vježba</Form.Title>
            {status === 'failed' && <Alert>{error}</Alert>}
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
            <Button primary>Dodaj</Button>
        </Form>
    )
}

export default CreateExerciseForm
