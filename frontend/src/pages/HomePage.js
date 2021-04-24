import Header from '../components/Header'
import EnrolledCourses from '../components/EnrolledCourses'
import { useSelector } from 'react-redux'
import { Grid, Main, Sidebar } from '../assets/styles'

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

export default HomePage
