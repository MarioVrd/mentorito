import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails, getCourseNews } from '../actions/courseActions'
import { STATUS } from '../constants/requestStatusConstants'
import useApi from '../hooks/useApi'
import useInput from '../hooks/useInput'
import { isRequired } from '../utils/validateUtils'
import NewsForm from './NewsForm'

const CourseNewsForm = ({ match, history }) => {
    const [title, setTitle, titleTouched, titleError] = useInput(
        '',
        isRequired,
        'Naslov je obavezan'
    )
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const courseNewsList = useSelector(state => state.courseNewsList)
    const { status, news } = courseNewsList

    const createCourseNews = useApi()
    const {
        status: createStatus,
        error: createError,
        data: createdNews,
        apiFunction: postToApi
    } = createCourseNews

    const updateCourseNews = useApi()
    const { status: updateStatus, error: updateError, apiFunction: putToApi } = updateCourseNews

    const submitHandler = e => {
        e.preventDefault()

        if (titleError) return

        const data = { title, content }

        if (match.params.newsId) {
            putToApi('PUT', `/api/courses/${match.params.id}/news/${match.params.newsId}`, data)
        } else {
            postToApi('POST', `/api/courses/${match.params.id}/news`, data)
        }
    }

    useEffect(() => {
        dispatch(getCourseNews(match.params.id))
    }, [match.params.id, dispatch])

    useEffect(() => {
        if (match.params.newsId && status === STATUS.completed) {
            const selectedNews = news.find(n => n.id === match.params.newsId)
            if (selectedNews) {
                setTitle(selectedNews.title)
                setContent(selectedNews.content)
            }
        }
    }, [match.params.newsId, setTitle, status, news])

    useEffect(() => {
        if (createStatus === STATUS.completed) {
            dispatch(getCourseDetails(match.params.id))
            history.push(`/courses/${match.params.id}/news/${createdNews.id}`)
        }
        if (updateStatus === STATUS.completed) {
            dispatch(getCourseDetails(match.params.id))
            history.push(`/courses/${match.params.id}/news/${match.params.newsId}`)
        }
    }, [dispatch, history, match, createStatus, updateStatus, createdNews])

    return (
        <NewsForm
            formTitle={match.params.newsId ? 'Uredi obavijest' : 'Dodaj obavijest'}
            submitHandler={submitHandler}
            title={title}
            setTitle={setTitle}
            titleTouched={titleTouched}
            titleError={titleError}
            content={content}
            setContent={setContent}
            createStatus={createStatus}
            createError={createError}
            updateStatus={updateStatus}
            updateError={updateError}
        />
    )
}

export default CourseNewsForm
