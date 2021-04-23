import Header from '../components/Header'
import EnrolledCourses from '../components/EnrolledCourses'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Grid>
            <Main>
                <Header />
                {userInfo && <EnrolledCourses />}
            </Main>
            <Sidebar>
                <h3>Other courses</h3>
            </Sidebar>
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: 5fr minmax(400px, 1fr);
`

const Main = styled.main`
    padding: 1rem 2rem;
`

const Sidebar = styled.aside`
    padding: 1rem;
    background-color: var(--clr-grey-100);
`

export default HomePage
