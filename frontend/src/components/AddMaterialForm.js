import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseMaterial } from '../actions/courseActions'
import { Button, Form } from '../assets/styles'
import Alert from './Alert'
import UploadFileInput from './UploadFileInput'

const AddMaterialForm = ({ match: { params } }) => {
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const upload = useSelector(state => state.upload)
    const { status, error, uploadData } = upload

    const addCourseMaterialHandler = e => {
        e.preventDefault()

        if (status === 'completed') {
            dispatch(addCourseMaterial(params.id, { uploadId: uploadData.id, description }))
        }
    }

    return (
        <Form onSubmit={addCourseMaterialHandler}>
            <Form.Title>Dodajte materijale</Form.Title>
            {error === <Alert>{error}</Alert>}
            <UploadFileInput />
            <Form.Group>
                <Form.Label htmlFor="description">Opis</Form.Label>
                <Form.Textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Group>

            <Button primary>Dodaj materijal</Button>
        </Form>
    )
}

export default AddMaterialForm
