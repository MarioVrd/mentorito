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
import AddExercisePage from './pages/AddExercisePage'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Layout>
                <SideMenu />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/courses" component={CoursesPage} />
                    <PrivateRoute admin exact path="/users/create" component={RegisterPage} />
                    <PrivateRoute admin exact path="/users" component={UsersPage} />
                    <PrivateRoute exact path="/exercises/:id" component={ExercisePage} />
                    <PrivateRoute
                        teacher
                        admin
                        exact
                        path="/courses/:id/add-exercise"
                        component={AddExercisePage}
                    />
                    <PrivateRoute exact path="/courses/:id" component={CoursePage} />
                    <PrivateRoute exact path="/settings" component={SettingsPage} />
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
