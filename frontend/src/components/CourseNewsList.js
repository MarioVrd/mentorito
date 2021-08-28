import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseNews } from '../actions/courseActions'
import { STATUS } from '../constants/requestStatusConstants'
import { ROLE_TEACHER } from '../constants/roles'
import useApi from '../hooks/useApi'
import Alert from './Alert'
import Loader from './Loader'
import NewsItem from './NewsItem'

const CourseNewsList = ({ match }) => {
    const [isMounted, setIsMounted] = useState(true)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseNewsList = useSelector(state => state.courseNewsList)
    const { status, error, news } = courseNewsList

    const api = useApi()
    const { status: apiStatus, error: apiError, apiFunction } = api

    const deleteCourseNews = newsId => {
        apiFunction('DELETE', `/api/courses/${match.params.id}/news/${newsId}`)
    }
    useEffect(() => {
        if (apiStatus === STATUS.completed && isMounted) dispatch(getCourseNews(match.params.id))
    }, [apiStatus, dispatch, isMounted, match.params.id])

    useEffect(() => {
        dispatch(getCourseNews(match.params.id))
    }, [dispatch, match.params.id])

    useEffect(() => {
        return () => {
            setIsMounted(false)
        }
    }, [])

    return status === STATUS.loading ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news?.length > 0 ? (
        <>
            {apiError && <Alert>{apiError}</Alert>}
            {news.map(n => (
                <NewsItem
                    key={n.id}
                    news={n}
                    canModify={userInfo?.role === ROLE_TEACHER}
                    url={`${match.url}/${n.id}`}
                    deleteHandler={() => deleteCourseNews(n.id)}
                />
            ))}
        </>
    ) : (
        <Alert variant="info">Trenutno nema obavijesti</Alert>
    )
}

export default CourseNewsList
