import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGlobalNews } from '../actions/newsActions'
import { STATUS } from '../constants/requestStatusConstants'
import { ROLE_ADMIN } from '../constants/roles'
import useApi from '../hooks/useApi'
import Alert from './Alert'
import Loader from './Loader'
import NewsItemDetails from './NewsItemDetails'

const GlobalNewsItem = ({ match, history }) => {
    const [isMounted, setIsMounted] = useState(true)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const globalNews = useApi()
    const { status, error, data: news, apiFunction } = globalNews

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
        dispatch(getGlobalNews())
        history.push('/news')
    }

    return status === STATUS.loading ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news ? (
        <NewsItemDetails
            news={news}
            canModify={userInfo?.role === ROLE_ADMIN}
            deleteHandler={deleteHandler}
            editUrl={`${match.url}/edit`}
        />
    ) : (
        <Loader />
    )
}

export default GlobalNewsItem
