// Shared component for global and course news create and update
import PropTypes from 'prop-types'
import { Button, Form } from '../assets/styles'
import { STATUS } from '../constants/requestStatusConstants'
import Alert from './Alert'

const NewsForm = props => {
    const {
        formTitle,
        submitHandler,
        title,
        setTitle,
        content,
        setContent,
        createStatus,
        createError,
        updateStatus,
        updateError
    } = props

    return (
        <Form onSubmit={submitHandler}>
            <Form.Title>{formTitle}</Form.Title>
            {createError && <Alert>{createError}</Alert>}
            {updateError && <Alert>{updateError}</Alert>}
            <Form.Group>
                <Form.Label htmlFor="title">Naslov</Form.Label>
                <Form.Input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="content">Sadržaj</Form.Label>
                <Form.Textarea
                    type="text"
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </Form.Group>

            <Button
                primary
                disabled={createStatus === STATUS.loading || updateStatus === STATUS.loading}
            >
                {formTitle}
            </Button>
        </Form>
    )
}

NewsForm.propTypes = {
    formTitle: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
    createStatus: PropTypes.string.isRequired,
    updateStatus: PropTypes.string.isRequired,
    createError: PropTypes.string,
    updateError: PropTypes.string
}

export default NewsForm
