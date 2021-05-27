import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseNews } from '../actions/courseActions'
import { Button, Form } from '../assets/styles'
import useApi from '../hooks/useApi'
import Alert from './Alert'

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
    const {
        status: updateStatus,
        error: updateError,
        data: updatedNews,
        apiFunction: putToApi
    } = updateCourseNews

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
        if (status !== 'completed') {
            dispatch(getCourseNews(match.params.id))
        }
    }, [match.params.id, status, dispatch])

    useEffect(() => {
        if (match.params.newsId && status === 'completed') {
            const selectedNews = news.find(n => n.id === match.params.newsId)
            setTitle(selectedNews.title)
            setContent(selectedNews.content)
        }
    }, [match.params.newsId, status])

    useEffect(() => {
        if (createStatus === 'completed') {
            history.push(`/courses/${match.params.id}/news/${createdNews.id}`)
        }
        if (updateStatus === 'completed') {
            history.push(`/courses/${match.params.id}/news/${match.params.newsId}`)
        }
    }, [history, match, createStatus, updateStatus, createdNews])

    return (
        <Form onSubmit={submitHandler}>
            <Form.Title>Dodajte obavijest</Form.Title>
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

            <Button primary disabled={createStatus === 'loading' || updateStatus === 'loading'}>
                {match.params.newsId ? 'Uredi obavijest' : 'Dodaj obavijest'}
            </Button>
        </Form>
    )
}

export default CourseNewsForm
