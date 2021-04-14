import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components/macro'
import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'
import GlobalStyle from './assets/GlobalStyles'
import CoursesPage from './pages/CoursesPage'
import SettingsPage from './pages/SettingsPage'

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Layout>
                <SideMenu />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/courses">
                        <CoursesPage />
                    </Route>
                    <Route exact path="/settings">
                        <SettingsPage />
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
