import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../actions/courseActions'
import { STATUS } from '../constants/requestStatusConstants'
import { ROLE_TEACHER } from '../constants/roles'
import useApi from '../hooks/useApi'
import Alert from './Alert'
import Loader from './Loader'
import NewsItemDetails from './NewsItemDetails'

const CourseNewsItem = ({ match, history }) => {
    const [isMounted, setIsMounted] = useState(true)

    const dispatch = useDispatch()

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
        dispatch(getCourseDetails(match.params.id))
        history.push(`/courses/${match.params.id}`)
    }

    return status === STATUS.loading ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news ? (
        <NewsItemDetails
            news={news}
            canModify={userInfo?.role === ROLE_TEACHER}
            deleteHandler={deleteHandler}
            editUrl={`${match.url}/edit`}
        />
    ) : (
        <Loader />
    )
}

export default CourseNewsItem
