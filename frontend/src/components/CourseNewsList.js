import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCourseNews } from '../actions/courseActions'
import { Button, LinkButton } from '../assets/styles'
import { ROLE_TEACHER } from '../constants/roles'
import useApi from '../hooks/useApi'
import Alert from './Alert'

const CourseNewsList = ({ match }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseNewsList = useSelector(state => state.courseNewsList)
    const { status, error, news } = courseNewsList

    const api = useApi()
    const { status: apiStatus, error: apiError, data: apiResponse, apiFunction } = api

    const deleteCourseNews = newsId => {
        apiFunction('DELETE', `/api/courses/${match.params.id}/news/${newsId}`)
    }
    useEffect(() => {
        if (apiStatus === 'completed') dispatch(getCourseNews(match.params.id))
    }, [apiStatus, dispatch])

    useEffect(() => {
        dispatch(getCourseNews(match.params.id))
    }, [dispatch, match.params.id])

    return status === 'loading' ? (
        'Loading...'
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news?.length > 0 ? (
        news.map(n => (
            <div key={n.id}>
                <h3>{n.title}</h3>
                <p>{n.content}</p>
                <p>Objavljeno: {n.createdAt}</p>
                {userInfo?.role === ROLE_TEACHER && (
                    <>
                        <LinkButton variant="success" to={`${match.url}/${n.id}/edit`}>
                            Uredi
                        </LinkButton>
                        <Button danger onClick={() => deleteCourseNews(n.id)}>
                            Izbriši
                        </Button>
                    </>
                )}
            </div>
        ))
    ) : (
        <Alert variant="info">Trenutno nema obavijesti</Alert>
    )
}

export default CourseNewsList
