import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'
import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'
import GlobalStyle from './assets/GlobalStyles'
import CoursesPage from './pages/CoursesPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Layout>
                <SideMenu />
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/courses">
                        <CoursesPage />
                    </Route>
                    <Route path="/settings">
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
