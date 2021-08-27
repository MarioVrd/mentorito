import { Button, LinkButton, News } from '../assets/styles'

const NewsItemDetails = ({ news, canModify, deleteHandler, editUrl }) => {
    return (
        <div>
            <News.Title>{news.title}</News.Title>
            <News.Content>{news.content}</News.Content>
            <News.Published>Objavljeno: {new Date(news.createdAt).toLocaleString()}</News.Published>
            {canModify && (
                <>
                    <LinkButton size="small" variant="success" to={editUrl}>
                        Uredi
                    </LinkButton>
                    <Button small danger onClick={deleteHandler}>
                        Izbriši
                    </Button>
                </>
            )}
        </div>
    )
}

export default NewsItemDetails
