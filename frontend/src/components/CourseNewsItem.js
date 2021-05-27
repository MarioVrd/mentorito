import { useEffect } from 'react'
import useApi from '../hooks/useApi'
import Alert from './Alert'

const CourseNewsItem = ({ match }) => {
    const courseNews = useApi()
    const { status, error, data: news, apiFunction: fetchNews } = courseNews

    useEffect(() => {
        if (fetchNews) fetchNews('GET', `/api${match.url}`)
    }, [fetchNews])

    return status === 'loading' ? (
        'Loading...'
    ) : error ? (
        <Alert>{error}</Alert>
    ) : (
        status === 'completed' && (
            <div>
                <h2>{news.title}</h2>
                <p>{news.content}</p>
                <div>Objavljeno: {news.createdAt}</div>
            </div>
        )
    )
}

export default CourseNewsItem
