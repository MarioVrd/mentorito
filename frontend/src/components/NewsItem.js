import styled from 'styled-components/macro'
import { Button, Card, LinkButton } from '../assets/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NewsItem = ({ news, canModify, url, deleteHandler }) => {
    return (
        <News>
            <News.Title>
                <Link to={url}>{news.title}</Link>
            </News.Title>
            {news.content && <News.Content>{news.content}</News.Content>}
            <News.Published>Objavljeno: {new Date(news.createdAt).toLocaleString()}</News.Published>
            {canModify && url && (
                <LinkButton size="small" variant="success" to={`${url}/edit`}>
                    Uredi
                </LinkButton>
            )}

            {canModify && deleteHandler && (
                <Button small danger onClick={deleteHandler}>
                    Izbriši
                </Button>
            )}
        </News>
    )
}

NewsItem.defaultProps = {
    canModify: false
}

NewsItem.propTypes = {
    news: PropTypes.object.isRequired,
    canModify: PropTypes.bool,
    url: PropTypes.string,
    deleteHandler: PropTypes.func
}

const News = styled(Card)`
    width: 100%;
    border-bottom: 1px solid var(--clr-grey-100);
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
`

News.Published = styled.p`
    font-size: 0.85rem;
    margin-bottom: 0.5em;
    color: var(--clr-grey-300);
`

News.Title = styled.h3`
    margin-bottom: 0.75rem;
`

News.Content = styled.p`
    margin-bottom: 1rem;
`

export default NewsItem
