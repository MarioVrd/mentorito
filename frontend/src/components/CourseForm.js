import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router'
import { createCourse, updateCourse, getCourseDetails } from '../actions/courseActions'
import { Button, Form } from '../assets/styles'
import {
    COURSE_CREATE_RESET,
    COURSE_DETAILS_RESET,
    COURSE_UPDATE_RESET
} from '../constants/courseConstants'
import Alert from './Alert'

const CourseForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [teacherEmail, setTeacherEmail] = useState('')
    const [locked, setLocked] = useState(false)

    const match = useRouteMatch()
    const history = useHistory()

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { status: courseStatus, error: courseError, course } = courseDetails

    const courseCreate = useSelector(state => state.courseCreate)
    const { status: createStatus, error: createError, course: createdCourse } = courseCreate

    const courseUpdate = useSelector(state => state.courseUpdate)
    const { status: updateStatus, error: updateError } = courseUpdate

    useEffect(() => {
        if (createStatus === 'completed') {
            history.push(`/courses/${createdCourse.id}`)
        }

        if (updateStatus === 'completed') {
            history.push(`/courses/${match.params.id}`)
        }
    }, [dispatch, createStatus, createdCourse, history, match.params.id, updateStatus])

    useEffect(() => {
        if (match.params.id && courseStatus === 'completed') {
            setTitle(course.title)
            setDescription(course.description || '')
            setLocked(course.locked)
        }
    }, [dispatch, match.params.id, courseStatus, course])

    useEffect(() => {
        dispatch(getCourseDetails(match.params.id))
        return () => {
            dispatch({ type: COURSE_DETAILS_RESET })
            dispatch({ type: COURSE_CREATE_RESET })
            dispatch({ type: COURSE_UPDATE_RESET })
        }
    }, [dispatch, match.params.id])

    const addOrUpdateCourseHandler = e => {
        e.preventDefault()

        if (match.params.id) {
            dispatch(updateCourse(match.params.id, { title, description, locked, teacherEmail }))
        } else {
            dispatch(createCourse({ title, description, locked, teacherEmail }))
        }
    }

    return (
        <>
            {courseError && <Alert>{courseError}</Alert>}
            <Form onSubmit={addOrUpdateCourseHandler}>
                {createError && <Alert>{createError}</Alert>}
                {updateError && <Alert>{updateError}</Alert>}
                <Form.Group>
                    <Form.Label htmlFor="title">Naziv kolegija</Form.Label>
                    <Form.Input
                        type="text"
                        id="title"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="teacherEmail">Email profesora</Form.Label>
                    <Form.Input
                        type="email"
                        id="teacherEmail"
                        value={teacherEmail}
                        onChange={e => setTeacherEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="description">Opis</Form.Label>
                    <Form.Textarea
                        type="text"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="locked">Zatvoren upis</Form.Label>
                    <Form.Input
                        type="checkbox"
                        id="locked"
                        checked={locked}
                        onChange={e => setLocked(e.target.checked)}
                    />
                </Form.Group>

                <Button primary disabled={createStatus === 'loading' || updateStatus === 'loading'}>
                    {match.params.id ? 'Uredi kolegij' : 'Dodaj kolegij'}
                </Button>
            </Form>
        </>
    )
}

export default CourseForm
