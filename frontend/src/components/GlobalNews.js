import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { getGlobalNews } from '../actions/newsActions'
import Alert from './Alert'
import NewsItem from './NewsItem'

const GlobalNews = () => {
    const dispatch = useDispatch()

    const globalNews = useSelector(state => state.globalNews)
    const { status, error, news } = globalNews

    useEffect(() => {
        dispatch(getGlobalNews())
    }, [dispatch])

    return status === 'loading' ? (
        'Loading...'
    ) : error ? (
        <Alert>{error}</Alert>
    ) : news?.length > 0 ? (
        <NewsWrapper>
            {news.map(n => (
                <NewsItem key={n.id} news={n} />
            ))}
        </NewsWrapper>
    ) : (
        <Alert variant="info">Trenutno nema obavijesti</Alert>
    )
}

const NewsWrapper = styled.div`
    background-color: var(--clr-info);
    color: var(--clr-white);
    padding: 1.25rem 1.5rem;
    border-radius: 5px;
    font-size: 0.9em;
`

export default GlobalNews
