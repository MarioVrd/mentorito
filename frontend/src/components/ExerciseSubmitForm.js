import { useSelector } from 'react-redux'
import { Button, Form } from '../assets/styles'
import { ROLE_STUDENT, ROLE_TEACHER } from '../constants/roles'
import Alert from './Alert'

const ExerciseSubmitForm = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const exerciseDetails = useSelector(state => state.exerciseDetails)
    const { exercise } = exerciseDetails

    const deadlineExpired = new Date(exercise.deadline).getTime() < new Date().getTime()

    return userInfo.role === ROLE_STUDENT && deadlineExpired ? (
        <Alert>Rok za predaju ove vježbe je istekao</Alert>
    ) : (
        <Form>
            {userInfo.role === ROLE_STUDENT && (
                <>
                    <Form.Group>
                        <Form.Label htmlFor="file">Datoteka za upload</Form.Label>
                        <Form.Input type="file" name="file" id="file" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="studentComment">Komentar</Form.Label>
                        <Form.Textarea name="studentComment" id="studentComment" />
                    </Form.Group>
                </>
            )}

            {userInfo.role === ROLE_TEACHER && (
                <>
                    <Form.Group>
                        <Form.Label htmlFor="teacherComment">Komentar profesora</Form.Label>
                        <Form.Textarea name="teacherComment" id="teacherComment" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="grade">Ocjena</Form.Label>
                        <Form.Input type="number" name="grade" id="grade" min="0" max="100" />
                    </Form.Group>
                </>
            )}
            <Button primary>Submit</Button>
        </Form>
    )
}

export default ExerciseSubmitForm
