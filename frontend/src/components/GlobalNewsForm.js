import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGlobalNews, updateGlobalNews } from '../actions/newsActions'
import { GLOBAL_NEWS_CREATE_RESET, GLOBAL_NEWS_UPDATE_RESET } from '../constants/newsConstants'
import { STATUS } from '../constants/requestStatusConstants'
import useApi from '../hooks/useApi'
import useInput from '../hooks/useInput'
import { isRequired } from '../utils/validateUtils'
import Alert from './Alert'
import NewsForm from './NewsForm'

const GlobalNewsForm = ({ match, history }) => {
    const [title, setTitle, titleTouched, titleError] = useInput(
        '',
        isRequired,
        'Naslov je obavezan'
    )
    const [content, setContent, contentTouched, contentError] = useInput(
        '',
        isRequired,
        'Sadržaj je obavezan'
    )

    const dispatch = useDispatch()

    const api = useApi()
    const { status, error, data: news, apiFunction } = api

    const globalNewsCreate = useSelector(state => state.globalNewsCreate)
    const { status: createStatus, error: createError } = globalNewsCreate

    const globalNewsUpdate = useSelector(state => state.globalNewsUpdate)
    const { status: updateStatus, error: updateError } = globalNewsUpdate

    const addOrUpdateGlobalNewsHandler = e => {
        e.preventDefault()

        if (titleError || contentError) return

        if (match.params.id) {
            dispatch(updateGlobalNews({ id: match.params.id, title, content }))
        } else {
            dispatch(createGlobalNews({ title, content }))
        }
    }

    useEffect(() => {
        if (status === STATUS.idle && match.params.id && apiFunction) {
            apiFunction('GET', `/api/news/${match.params.id}`)
        }
    }, [status, apiFunction, match.params.id])

    useEffect(() => {
        if (match.params.id && status === STATUS.completed) {
            setTitle(news.title)
            setContent(news.content)
        }
    }, [match.params.id, setTitle, setContent, status, news])

    useEffect(() => {
        if (updateStatus === STATUS.completed || createStatus === STATUS.completed) {
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
                titleTouched={titleTouched}
                titleError={titleError}
                content={content}
                setContent={setContent}
                contentTouched={contentTouched}
                contentError={contentError}
                createStatus={createStatus}
                createError={createError}
                updateStatus={updateStatus}
                updateError={updateError}
            />
        </>
    )
}

export default GlobalNewsForm
