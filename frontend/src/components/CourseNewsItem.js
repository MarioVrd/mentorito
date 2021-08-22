import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, LinkButton, News } from '../assets/styles'
import { ROLE_TEACHER } from '../constants/roles'
import useApi from '../hooks/useApi'
import Alert from './Alert'
import Loader from './Loader'

const CourseNewsItem = ({ match, history }) => {
    const [isMounted, setIsMounted] = useState(true)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseNews = useApi()
    const { status, error, data: news, apiFunction } = courseNews

    useEffect(() => {
        if (apiFunction && isMounted) apiFunction('GET', `/api${match.url}`)
    }, [apiFunction, match.url, isMounted])

    useEffect(() => {
        return () => {
            setIsMounted(false)
        }
    }, [])

    const deleteHandler = () => {
        apiFunction('DELETE', `/api${match.url}`)
        history.push(`/courses/${match.params.id}`)
    }

    return status === 'loading' ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news ? (
        <div>
            <News.Title>{news.title}</News.Title>
            <News.Content>{news.content}</News.Content>
            <News.Published>Objavljeno: {new Date(news.createdAt).toLocaleString()}</News.Published>
            {userInfo?.role === ROLE_TEACHER && (
                <>
                    <LinkButton size="small" variant="success" to={`${match.url}/edit`}>
                        Uredi
                    </LinkButton>
                    <Button small danger onClick={deleteHandler}>
                        Izbriši
                    </Button>
                </>
            )}
        </div>
    ) : (
        <Loader />
    )
}

export default CourseNewsItem
