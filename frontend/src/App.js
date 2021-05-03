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

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Layout>
                <SideMenu />
                <Switch>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/users/create">
                        <RegisterPage />
                    </Route>
                    <Route exact path="/users">
                        <UsersPage />
                    </Route>
                    <Route exact path="/exercises/:id">
                        <ExercisePage />
                    </Route>
                    <Route exact path="/courses/:id">
                        <CoursePage />
                    </Route>
                    <Route exact path="/courses">
                        <CoursesPage />
                    </Route>
                    <Route exact path="/settings">
                        <SettingsPage />
                    </Route>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
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
