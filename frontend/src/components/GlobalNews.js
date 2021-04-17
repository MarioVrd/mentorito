import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { getGlobalNews } from '../actions/newsActions'
import Alert from './Alert'

const GlobalNews = () => {
    const dispatch = useDispatch()

    const globalNews = useSelector(state => state.globalNews)
    const { loading, error, news } = globalNews

    useEffect(() => {
        dispatch(getGlobalNews())
    }, [dispatch])

    return news && news.length ? (
        <NewsWrapper>
            {loading && 'Loading...'}
            {error && <Alert>{error}</Alert>}
            {news.map(n => (
                <News key={n.id}>
                    <News.Title>{n.title}</News.Title>
                    {n.content}
                </News>
            ))}
        </NewsWrapper>
    ) : null
}

const NewsWrapper = styled.div`
    background-color: var(--clr-info);
    color: var(--clr-white);
    padding: 1.25rem 1.5rem;
    border-radius: 5px;
    font-size: 0.9em;
`

const News = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--clr-grey-100);
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
`

News.Title = styled.h3`
    margin-bottom: 0.25rem;
`

export default GlobalNews
