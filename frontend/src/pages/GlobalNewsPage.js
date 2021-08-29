import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import { deleteGlobalNews, getGlobalNews } from '../actions/newsActions'
import { Grid, Main } from '../assets/styles'
import Sidebar from '../components/Sidebar'
import Alert from '../components/Alert'
import GlobalNewsForm from '../components/GlobalNewsForm'
import NewsItem from '../components/NewsItem'
import PrivateRoute from '../components/PrivateRoute'
import {
    GLOBAL_NEWS_CREATE_RESET,
    GLOBAL_NEWS_DELETE_RESET,
    GLOBAL_NEWS_UPDATE_RESET
} from '../constants/newsConstants'
import { ROLE_ADMIN } from '../constants/roles'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import GlobalNewsItem from '../components/GlobalNewsItem'
import { STATUS } from '../constants/requestStatusConstants'

const GlobalNewsPage = ({ match: { path } }) => {
    const location = useLocation()

    const page = location.search.split('page=')[1]

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const globalNews = useSelector(state => state.globalNews)
    const { status, error, news, numOfPages } = globalNews

    const globalNewsCreate = useSelector(state => state.globalNewsCreate)
    const { news: createdNews } = globalNewsCreate

    const globalNewsUpdate = useSelector(state => state.globalNewsUpdate)
    const { news: updatedNews } = globalNewsUpdate

    const globalNewsDelete = useSelector(state => state.globalNewsDelete)
    const { message } = globalNewsDelete

    useEffect(() => {
        dispatch(getGlobalNews(location.search))

        return () => {
            dispatch({ type: GLOBAL_NEWS_CREATE_RESET })
            dispatch({ type: GLOBAL_NEWS_UPDATE_RESET })
            dispatch({ type: GLOBAL_NEWS_DELETE_RESET })
        }
    }, [dispatch, location.search])

    return (
        <Grid>
            <Main>
                <Main.Title>
                    <Link to="/news">Općenite obavijesti</Link>
                </Main.Title>
                {status === STATUS.loading ? (
                    <Loader />
                ) : error ? (
                    <Alert>{error}</Alert>
                ) : (
                    <>
                        {message && <Alert variant="success">{message}</Alert>}
                        {createdNews && (
                            <Alert variant="success">
                                Uspješno dodana obavijest {createdNews.title}
                            </Alert>
                        )}
                        {updatedNews && (
                            <Alert variant="success">
                                Uspješno ažurirana obavijest {updatedNews.title}
                            </Alert>
                        )}

                        <Switch>
                            <PrivateRoute
                                admin
                                exact
                                path={`${path}/add`}
                                component={GlobalNewsForm}
                            />
                            <PrivateRoute
                                admin
                                exact
                                path={`${path}/:id/edit`}
                                component={GlobalNewsForm}
                            />

                            <Route exact path={`${path}/:id`} component={GlobalNewsItem} />

                            <Route exact path={path}>
                                {news?.length > 0 ? (
                                    <>
                                        {news.map(n => (
                                            <NewsItem
                                                key={n.id}
                                                news={n}
                                                canModify={userInfo?.role === ROLE_ADMIN}
                                                url={`/news/${n.id}`}
                                                deleteHandler={() =>
                                                    dispatch(deleteGlobalNews(n.id))
                                                }
                                            />
                                        ))}
                                        {numOfPages > 1 && (
                                            <Pagination
                                                numOfPages={+numOfPages}
                                                currentPage={+page || 1}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <Alert variant="info">Trenutno nema obavijesti</Alert>
                                )}
                            </Route>
                        </Switch>
                    </>
                )}
            </Main>
            <Sidebar>
                {userInfo?.role === ROLE_ADMIN && (
                    <div>
                        <h3>Poveznice</h3>
                        <Link to={`${path}/add`}>Dodaj obavijest</Link>
                    </div>
                )}
            </Sidebar>
        </Grid>
    )
}

export default GlobalNewsPage
