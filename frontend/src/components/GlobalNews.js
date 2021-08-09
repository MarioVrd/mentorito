import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteGlobalNews, getGlobalNews } from '../actions/newsActions'
import { ROLE_ADMIN } from '../constants/roles'
import { STATUS } from '../constants/requestStatusConstants'
import NewsItem from './NewsItem'
import Alert from './Alert'
import Loader from './Loader'

const GlobalNews = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const globalNews = useSelector(state => state.globalNews)
    const { status, news, error } = globalNews

    useEffect(() => {
        dispatch(getGlobalNews('?size=1'))
    }, [dispatch])

    return status === STATUS.loading ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news?.length > 0 ? (
        <>
            {news.map(n => (
                <NewsItem
                    key={n.id}
                    news={n}
                    canModify={userInfo?.role === ROLE_ADMIN}
                    url={`/news/${n.id}`}
                    deleteHandler={() => dispatch(deleteGlobalNews(n.id))}
                />
            ))}
            <p>
                <Link to="/news">Pogledajte više novosti</Link>
            </p>
        </>
    ) : (
        <Alert variant="info">Trenutno nema novosti</Alert>
    )
}

export default GlobalNews
