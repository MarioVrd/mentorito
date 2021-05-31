import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGlobalNews, getGlobalNews, updateGlobalNews } from '../actions/newsActions'
import { GLOBAL_NEWS_CREATE_RESET, GLOBAL_NEWS_UPDATE_RESET } from '../constants/newsConstants'
import Alert from './Alert'
import NewsForm from './NewsForm'

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
            <NewsForm
                formTitle={match.params.id ? 'Uredi obavijest' : 'Dodaj obavijest'}
                submitHandler={addOrUpdateGlobalNewsHandler}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                createStatus={createStatus}
                createError={createError}
                updateStatus={updateStatus}
                updateError={updateError}
            />
        </>
    )
}

export default CreateGlobalNewsForm
