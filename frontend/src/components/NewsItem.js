import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { deleteGlobalNews } from '../actions/newsActions'
import { Button, LinkButton } from '../assets/styles'
import { ROLE_ADMIN } from '../constants/roles'

const NewsItem = ({ news }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteNewsHandler = () => {
        dispatch(deleteGlobalNews(news.id))
    }

    return (
        <News>
            <News.Title>{news.title}</News.Title>
            <News.Content>{news.content}</News.Content>
            {userInfo.role === ROLE_ADMIN && (
                <>
                    <LinkButton variant="success" to={`/news/${news.id}/edit`}>
                        Uredi
                    </LinkButton>

                    <Button danger onClick={deleteNewsHandler}>
                        Izbriši
                    </Button>
                </>
            )}
        </News>
    )
}

const News = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--clr-grey-100);
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
`

News.Title = styled.h3`
    margin-bottom: 0.25rem;
`

News.Content = styled.p``

export default NewsItem
