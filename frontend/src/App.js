import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'
import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'
import GlobalStyle from './assets/GlobalStyles'
import CoursesPage from './pages/CoursesPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import RegisterPage from './pages/RegisterPage'
import CoursePage from './pages/CoursePage'
import ExercisePage from './pages/ExercisePage'
import PrivateRoute from './components/PrivateRoute'
import GlobalNewsPage from './pages/GlobalNewsPage'
import CourseForm from './components/CourseForm'

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Layout>
                <SideMenu />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/courses" component={CoursesPage} />
                    <Route path="/news" component={GlobalNewsPage} />
                    <PrivateRoute admin exact path="/users/create" component={RegisterPage} />
                    <PrivateRoute admin exact path="/users" component={UsersPage} />
                    <PrivateRoute exact path="/exercises/:id" component={ExercisePage} />

                    <PrivateRoute exact path="/settings" component={SettingsPage} />
                    <PrivateRoute path="/courses/:id" component={CoursePage} />
                    <PrivateRoute
                        admin
                        exact
                        path="/admin/courses/:id/edit"
                        component={CourseForm}
                    />
                    <PrivateRoute
                        admin
                        exact
                        path={`/admin/courses/create`}
                        component={CourseForm}
                    />
                </Switch>
            </Layout>
        </Router>
    )
}

const Layout = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 7fr;
`

export default App
