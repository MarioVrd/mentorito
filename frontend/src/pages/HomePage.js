import Header from '../components/Header'
import EnrolledCourses from '../components/EnrolledCourses'
import { useSelector } from 'react-redux'
import { Grid, Main } from '../assets/styles'
import Sidebar from '../components/Sidebar'

const HomePage = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Grid>
            <Main>
                <Header />
                {userInfo && <EnrolledCourses />}
            </Main>
            <Sidebar />
        </Grid>
    )
}

export default HomePage
