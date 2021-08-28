import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../actions/uploadActions'
import { Form } from '../assets/styles'
import { STATUS } from '../constants/requestStatusConstants'
import { UPLOAD_RESET } from '../constants/uploadConstants'
import Alert from './Alert'

const UploadFileInput = () => {
    const dispatch = useDispatch()
    const upload = useSelector(state => state.upload)
    const { status, error } = upload

    const uploadFileHandler = e => {
        dispatch(uploadFile(e.target.files[0]))
    }

    useEffect(() => {
        return () => {
            dispatch({ type: UPLOAD_RESET })
        }
    }, [dispatch])

    return (
        <Form.Group>
            {error && (
                <Alert>
                    Dogodila se greška prilikom učitavanja datoteke, molimo pokušajte ponovno
                </Alert>
            )}

            {status === STATUS.completed && <Alert variant="info">Datoteka uspješno učitana</Alert>}
            {status === STATUS.loading && <Alert variant="info">Učitavanje datoteke</Alert>}

            <Form.Label htmlFor="file">Datoteka za upload</Form.Label>
            <Form.Input type="file" name="file" id="file" onChange={uploadFileHandler} />
        </Form.Group>
    )
}

export default UploadFileInput
