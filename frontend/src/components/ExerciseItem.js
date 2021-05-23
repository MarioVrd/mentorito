import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getFileFromApi } from '../utils/downloadUtils'
import ExerciseSubmitForm from './ExerciseSubmitForm'

const ExerciseItem = ({ exercise }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const downloadHandler = async e => {
        e.preventDefault()

        await getFileFromApi(exercise.upload, userInfo.token)
    }
    return (
        <Submission>
            <Submission.Title>
                Vježba predana <strong>{new Date(exercise.createdAt).toLocaleString()}</strong>
            </Submission.Title>
            <Submission.UpdatedAt>
                Zadnji put ažurirano: {new Date(exercise.updatedAt).toLocaleString()}
            </Submission.UpdatedAt>

            {exercise.studentComment && (
                <Submission.Comment>
                    <strong>Komentar studenta:</strong> {exercise.studentComment}
                </Submission.Comment>
            )}

            {exercise.upload && (
                <Submission.Upload>
                    <strong>Predana datoteka: </strong>
                    <Link to="" onClick={downloadHandler}>
                        {exercise.upload.title}
                    </Link>
                </Submission.Upload>
            )}

            {exercise.teacherComment && (
                <Submission.Comment>
                    <strong>Komentar profesora:</strong> {exercise.teacherComment}
                </Submission.Comment>
            )}

            <Submission.Comment>
                <strong>Ocjena:</strong> {exercise.grade ? exercise.grade : 'Nije ocijenjeno'}
            </Submission.Comment>

            <ExerciseSubmitForm />
        </Submission>
    )
}

const Submission = styled.div``

Submission.Title = styled.h3`
    font-weight: 400;
`

Submission.UpdatedAt = styled.p`
    font-weight: 300;
    margin-bottom: 1rem;
`

Submission.Comment = styled.p`
    margin-bottom: 1rem;
`

Submission.Upload = styled.p`
    margin-bottom: 1rem;
`

export default ExerciseItem
