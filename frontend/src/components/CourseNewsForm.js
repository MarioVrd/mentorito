import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails, getCourseNews } from '../actions/courseActions'
import useApi from '../hooks/useApi'
import NewsForm from './NewsForm'

const CourseNewsForm = ({ match, history }) => {
    const [title, setTitle] = useState('')
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
        if (match.params.newsId && status === 'completed') {
            const selectedNews = news.find(n => n.id === match.params.newsId)
            if (selectedNews) {
                setTitle(selectedNews.title)
                setContent(selectedNews.content)
            }
        }
    }, [match.params.newsId, status, news])

    useEffect(() => {
        if (createStatus === 'completed') {
            dispatch(getCourseDetails(match.params.id))
            history.push(`/courses/${match.params.id}/news/${createdNews.id}`)
        }
        if (updateStatus === 'completed') {
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
