import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { getGlobalNews } from '../actions/newsActions'
import { Grid, Main, Sidebar } from '../assets/styles'
import Alert from '../components/Alert'
import GlobalNewsForm from '../components/GlobalNewsForm'
import NewsItem from '../components/NewsItem'
import PrivateRoute from '../components/PrivateRoute'
import {
    GLOBAL_NEWS_CREATE_RESET,
    GLOBAL_NEWS_DELETE_RESET,
    GLOBAL_NEWS_UPDATE_RESET
} from '../constants/newsConstants'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants/roles'

const GlobalNewsPage = ({ match: { path }, history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const globalNews = useSelector(state => state.globalNews)
    const { status, error, news } = globalNews

    const globalNewsCreate = useSelector(state => state.globalNewsCreate)
    const { news: createdNews } = globalNewsCreate

    const globalNewsUpdate = useSelector(state => state.globalNewsUpdate)
    const { news: updatedNews } = globalNewsUpdate

    const globalNewsDelete = useSelector(state => state.globalNewsDelete)
    const { message } = globalNewsDelete

    useEffect(() => {
        dispatch(getGlobalNews())

        return () => {
            dispatch({ type: GLOBAL_NEWS_CREATE_RESET })
            dispatch({ type: GLOBAL_NEWS_UPDATE_RESET })
            dispatch({ type: GLOBAL_NEWS_DELETE_RESET })
        }
    }, [dispatch])

    return (
        <Grid>
            <Main>
                {error && <Alert>{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                {createdNews && (
                    <Alert variant="success">Uspješno dodana obavijest {createdNews.title}</Alert>
                )}
                {updatedNews && (
                    <Alert variant="success">
                        Uspješno ažurirana obavijest {updatedNews.title}
                    </Alert>
                )}

                <Switch>
                    <PrivateRoute
                        admin
                        teacher
                        exact
                        path={`${path}/add`}
                        component={GlobalNewsForm}
                    />
                    <PrivateRoute
                        admin
                        teacher
                        exact
                        path={`${path}/:id/edit`}
                        component={GlobalNewsForm}
                    />
                    <Route exact path={path}>
                        {status === 'completed' && news.map(n => <NewsItem key={n.id} news={n} />)}
                    </Route>
                </Switch>
            </Main>
            <Sidebar>
                {(userInfo.role === ROLE_ADMIN || userInfo.role === ROLE_TEACHER) && (
                    <Link to={`${path}/add`}>Dodaj obavijest</Link>
                )}
            </Sidebar>
        </Grid>
    )
}

export default GlobalNewsPage
