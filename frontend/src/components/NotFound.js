import { Grid, Main } from '../assets/styles'
import Sidebar from './Sidebar'

const NotFound = () => {
    return (
        <Grid>
            <Main>
                <Main.Title>404 - Not Found</Main.Title>
                <Main.Description>Ovdje nema ništa...</Main.Description>
            </Main>
            <Sidebar />
        </Grid>
    )
}

export default NotFound
