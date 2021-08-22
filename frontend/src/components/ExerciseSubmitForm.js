import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { submitExercise } from '../actions/exerciseActions'
import { Button, Form } from '../assets/styles'
import { EXERCISE_SUBMIT_RESET } from '../constants/exerciseConstants'
import { ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles'
import Alert from './Alert'
import UploadFileInput from './UploadFileInput'

const ExerciseSubmitForm = () => {
    const location = useLocation()
    const studentId = location.search.split('=')[1]

    const dispatch = useDispatch()

    const [studentComment, setStudentComment] = useState('')
    const [teacherComment, setTeacherComment] = useState('')
    const [grade, setGrade] = useState(0)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const exerciseDetails = useSelector(state => state.exerciseDetails)
    const { exercise } = exerciseDetails

    const upload = useSelector(state => state.upload)
    const { status: uploadStatus, uploadData } = upload

    const exerciseSubmit = useSelector(state => state.exerciseSubmit)
    const { status: submitStatus, error } = exerciseSubmit

    const deadlineExpired =
        exercise.deadline && new Date(exercise.deadline).getTime() < new Date().getTime()

    const submitHandler = e => {
        e.preventDefault()

        let submitData = {}

        if (userInfo?.role === ROLE_STUDENT && studentComment) {
            submitData.studentComment = studentComment
        }

        if (userInfo?.role === ROLE_TEACHER) {
            submitData.studentId = studentId
            if (teacherComment) submitData.teacherComment = teacherComment
            if (grade) submitData.grade = grade
        }

        if (uploadStatus === 'completed') {
            submitData.uploadId = uploadData.id
        }

        dispatch(submitExercise(submitData))
    }

    useEffect(() => {
        return () => {
            dispatch({ type: EXERCISE_SUBMIT_RESET })
        }
    }, [dispatch])

    return userInfo?.role === ROLE_STUDENT && deadlineExpired ? (
        <Alert>Rok za predaju ove vježbe je istekao</Alert>
    ) : (
        <Form onSubmit={submitHandler}>
            {error && <Alert>{error}</Alert>}
            {submitStatus === 'completed' && <Alert variant="info">Uspješno</Alert>}
            {userInfo?.role === ROLE_STUDENT && (
                <>
                    <UploadFileInput />
                    <Form.Group>
                        <Form.Label htmlFor="studentComment">Komentar</Form.Label>
                        <Form.Textarea
                            name="studentComment"
                            id="studentComment"
                            value={studentComment}
                            onChange={e => setStudentComment(e.target.value)}
                        />
                    </Form.Group>
                </>
            )}

            {userInfo?.role === ROLE_TEACHER && (
                <>
                    <Form.Group>
                        <Form.Label htmlFor="teacherComment">Komentar profesora</Form.Label>
                        <Form.Textarea
                            name="teacherComment"
                            id="teacherComment"
                            value={teacherComment}
                            onChange={e => setTeacherComment(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="grade">Ocjena</Form.Label>
                        <Form.Input
                            type="number"
                            name="grade"
                            id="grade"
                            min="0"
                            max="100"
                            value={grade}
                            onChange={e => setGrade(e.target.value)}
                        />
                    </Form.Group>
                </>
            )}
            <Button primary disabled={uploadStatus === 'loading' || submitStatus === 'loading'}>
                Predaj
            </Button>
        </Form>
    )
}

export default ExerciseSubmitForm
