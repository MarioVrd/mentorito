import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGlobalNews, getGlobalNews, updateGlobalNews } from '../actions/newsActions'
import { Button, Form } from '../assets/styles'
import { GLOBAL_NEWS_CREATE_RESET, GLOBAL_NEWS_UPDATE_RESET } from '../constants/newsConstants'
import Alert from './Alert'

const CreateGlobalNewsForm = ({ match, history }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const globalNews = useSelector(state => state.globalNews)
    const { status, error, news } = globalNews

    const globalNewsCreate = useSelector(state => state.globalNewsCreate)
    const { status: createStatus, error: createError } = globalNewsCreate

    const globalNewsUpdate = useSelector(state => state.globalNewsUpdate)
    const { status: updateStatus, error: updateError } = globalNewsUpdate

    const addOrUpdateGlobalNewsHandler = e => {
        e.preventDefault()

        if (match.params.id) {
            dispatch(updateGlobalNews({ id: match.params.id, title, content }))
        } else {
            dispatch(createGlobalNews({ title, content }))
        }
    }

    useEffect(() => {
        if (status !== 'completed') {
            dispatch(getGlobalNews())
        }
    }, [status, dispatch])

    useEffect(() => {
        if (match.params.id && status === 'completed') {
            const selectedNews = news.find(n => n.id === match.params.id)
            setTitle(selectedNews.title)
            setContent(selectedNews.content)
        }
    }, [match.params.id, status, news])

    useEffect(() => {
        if (updateStatus === 'completed' || createStatus === 'completed') {
            dispatch({ type: GLOBAL_NEWS_UPDATE_RESET })
            dispatch({ type: GLOBAL_NEWS_CREATE_RESET })
            history.push('/news')
        }
    }, [dispatch, updateStatus, createStatus, history])

    return (
        <>
            {error && <Alert>{error}</Alert>}
            <Form onSubmit={addOrUpdateGlobalNewsHandler}>
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
                        required
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </Form.Group>

                <Button primary disabled={createStatus === 'loading' || updateStatus === 'loading'}>
                    {match.params.id ? 'Uredi obavijest' : 'Dodaj obavijest'}
                </Button>
            </Form>
        </>
    )
}

export default CreateGlobalNewsForm
