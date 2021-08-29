import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseMaterial, getCourseDetails } from '../actions/courseActions'
import { Button, Form } from '../assets/styles'
import { COURSE_MATERIAL_ADD_RESET } from '../constants/courseConstants'
import { STATUS } from '../constants/requestStatusConstants'
import Alert from './Alert'
import UploadFileInput from './UploadFileInput'

const AddMaterialForm = ({ match: { params }, history }) => {
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const upload = useSelector(state => state.upload)
    const { status, error, uploadData } = upload

    const courseMaterialAdd = useSelector(state => state.courseMaterialAdd)
    const { status: addMaterialStatus, error: addMaterialError } = courseMaterialAdd

    const addCourseMaterialHandler = e => {
        e.preventDefault()

        if (status === STATUS.completed) {
            dispatch(addCourseMaterial(params.id, { uploadId: uploadData.id, description }))
        }
    }

    useEffect(() => {
        if (addMaterialStatus === STATUS.completed) {
            dispatch(getCourseDetails(params.id))
            history.push(`/courses/${params.id}`)
        }
    }, [dispatch, history, params.id, addMaterialStatus])

    useEffect(() => () => dispatch({ type: COURSE_MATERIAL_ADD_RESET }), [dispatch])

    return (
        <Form onSubmit={addCourseMaterialHandler}>
            <Form.Title>Dodajte materijale</Form.Title>
            {error === <Alert>{error}</Alert>}
            {addMaterialError === <Alert>{addMaterialError}</Alert>}
            <UploadFileInput />
            <Form.Group>
                <Form.Label htmlFor="description">Opis</Form.Label>
                <Form.Textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Group>

            <Button primary disabled={addMaterialStatus === STATUS.loading}>
                Dodaj materijal
            </Button>
        </Form>
    )
}

export default AddMaterialForm
