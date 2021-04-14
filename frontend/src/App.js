import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'
import styled from 'styled-components/macro'
import GlobalStyle from './assets/GlobalStyles'

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Layout>
                <SideMenu />
                <HomePage />
            </Layout>
        </>
    )
}

const Layout = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 7fr;
`

export default App
