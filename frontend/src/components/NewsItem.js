import { Button, News, LinkButton } from '../assets/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NewsItem = ({ news, canModify, url, deleteHandler }) => {
    return (
        <News>
            <News.Title>
                <Link to={url}>{news.title}</Link>
            </News.Title>
            {news.content && (
                <News.Content>
                    {news.content.length > 100 ? `${news.content.slice(0, 100)}...` : news.content}
                </News.Content>
            )}
            <News.Published>
                Objavio {news.admin && `${news.admin.firstName} ${news.admin.lastName}`}{' '}
                {news.teacher && `${news.teacher.firstName} ${news.teacher.lastName}`}{' '}
                {new Date(news.createdAt).toLocaleString()}
            </News.Published>
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

export default NewsItem
