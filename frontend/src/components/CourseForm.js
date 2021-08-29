import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router'
import styled from 'styled-components'
import { createCourse, updateCourse, getCourseDetails } from '../actions/courseActions'
import { getUsers } from '../actions/userActions'
import { Button, Form } from '../assets/styles'
import {
    COURSE_CREATE_RESET,
    COURSE_DETAILS_RESET,
    COURSE_UPDATE_RESET
} from '../constants/courseConstants'
import { STATUS } from '../constants/requestStatusConstants'
import { ROLE_TEACHER } from '../constants/roles'
import useInput from '../hooks/useInput'
import { isRequired } from '../utils/validateUtils'
import Alert from './Alert'

const CourseForm = () => {
    const [title, setTitle, titleTouched, titleError] = useInput(
        '',
        isRequired,
        'Naziv je obavezan'
    )
    const [description, setDescription] = useState('')
    const [teachers, setTeachers] = useState([])
    const [locked, setLocked] = useState(false)

    const match = useRouteMatch()
    const history = useHistory()

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { users: allTeachers } = userList

    const courseDetails = useSelector(state => state.courseDetails)
    const { status: courseStatus, error: courseError, course } = courseDetails

    const courseCreate = useSelector(state => state.courseCreate)
    const { status: createStatus, error: createError, course: createdCourse } = courseCreate

    const courseUpdate = useSelector(state => state.courseUpdate)
    const { status: updateStatus, error: updateError } = courseUpdate

    useEffect(() => {
        if (createStatus === STATUS.completed) {
            history.push(`/courses/${createdCourse.id}`)
        }

        if (updateStatus === STATUS.completed) {
            history.push(`/courses/${match.params.id}`)
        }
    }, [dispatch, createStatus, createdCourse, history, match.params.id, updateStatus])

    useEffect(() => {
        if (match.params.id && courseStatus === STATUS.completed) {
            setTitle(course.title)
            setDescription(course.description || '')
            setLocked(course.locked)
            setTeachers(
                course.enrolledUsers
                    .filter(
                        enrollment => enrollment.user.role === ROLE_TEACHER && enrollment.userId
                    )
                    .map(e => e.userId)
            )
        }
    }, [dispatch, setTitle, match.params.id, courseStatus, course])

    useEffect(() => {
        if (match.params.id) dispatch(getCourseDetails(match.params.id))
        dispatch(getUsers(ROLE_TEACHER))
        return () => {
            dispatch({ type: COURSE_DETAILS_RESET })
            dispatch({ type: COURSE_CREATE_RESET })
            dispatch({ type: COURSE_UPDATE_RESET })
        }
    }, [dispatch, match.params.id])

    const enrollTeacherHandler = teacherId => {
        setTeachers(prevTeachers => [...prevTeachers, teacherId])
    }

    const unenrollTeacherHandler = teacherId => {
        setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher !== teacherId))
    }

    const addOrUpdateCourseHandler = e => {
        e.preventDefault()

        if (titleError) return

        if (match.params.id) {
            dispatch(updateCourse(match.params.id, { title, description, locked, teachers }))
        } else {
            dispatch(createCourse({ title, description, locked, teachers }))
        }
    }

    return (
        <>
            {match.params.id && courseError && <Alert>{courseError}</Alert>}
            <Form onSubmit={addOrUpdateCourseHandler}>
                <Form.Title>{match.params.id ? 'Uredi kolegij' : 'Dodaj kolegij'}</Form.Title>
                {createError && <Alert>{createError}</Alert>}
                {updateError && <Alert>{updateError}</Alert>}
                <Form.Group>
                    <Form.Label htmlFor="title">Naziv kolegija</Form.Label>
                    <Form.Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {titleTouched && titleError && <Form.Error>{titleError}</Form.Error>}
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

                {allTeachers?.length > 0 && (
                    <Form.Group
                        style={{
                            padding: '1rem',
                            backgroundColor: 'var(--clr-grey-100)',
                            borderRadius: '5px'
                        }}
                    >
                        <Split>
                            <div>
                                <Form.Label
                                    style={{
                                        fontWeight: 'bold',
                                        borderBottom: '1px solid var(--clr-grey-200)',
                                        paddingBottom: '.5rem'
                                    }}
                                >
                                    Popis profesora
                                </Form.Label>
                                {allTeachers.map(
                                    teacher =>
                                        teachers.indexOf(teacher.id) === -1 && (
                                            <Spread key={teacher.id}>
                                                {teacher.firstName} {teacher.lastName}
                                                <Button
                                                    type="button"
                                                    onClick={() => enrollTeacherHandler(teacher.id)}
                                                    success
                                                    small
                                                >
                                                    Dodaj
                                                </Button>
                                            </Spread>
                                        )
                                )}
                            </div>
                            <div>
                                <Form.Label
                                    style={{
                                        fontWeight: 'bold',
                                        borderBottom: '1px solid var(--clr-grey-200)',
                                        paddingBottom: '.5rem'
                                    }}
                                >
                                    Profesori na kolegiju
                                </Form.Label>
                                {allTeachers.map(
                                    teacher =>
                                        teachers.indexOf(teacher.id) !== -1 && (
                                            <Spread key={teacher.id}>
                                                {teacher.firstName} {teacher.lastName}
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        unenrollTeacherHandler(teacher.id)
                                                    }
                                                    danger
                                                    small
                                                >
                                                    Ukloni
                                                </Button>
                                            </Spread>
                                        )
                                )}
                            </div>
                        </Split>
                    </Form.Group>
                )}

                <Button
                    primary
                    disabled={createStatus === STATUS.loading || updateStatus === STATUS.loading}
                >
                    {match.params.id ? 'Uredi kolegij' : 'Dodaj kolegij'}
                </Button>
            </Form>
        </>
    )
}

const Split = styled.div`
    @media (min-width: 1000px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`

const Spread = styled.p`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-right: 3rem;
    margin-top: 1rem;
`

export default CourseForm
