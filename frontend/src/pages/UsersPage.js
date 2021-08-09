import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getUsers } from '../actions/userActions'
import { Grid, Main } from '../assets/styles'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import UserCard from '../components/UserCard'
import { ROLE_ADMIN } from '../constants/roles'

const UsersPage = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { status, error, users } = userList

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return userInfo && userInfo.role === ROLE_ADMIN ? (
        <Grid>
            <Main>
                <Main.Title>Popis korisnika</Main.Title>
                {status === 'loading' && <Loader />}
                {error && <Alert>{error}</Alert>}
                <CardGrid>
                    {users && users.map(user => <UserCard key={user.id} user={user} />)}
                </CardGrid>
            </Main>
            <Sidebar>
                <div>
                    <h3>Linkovi</h3>
                    <ul>
                        <li>
                            <Link to="/users/create">Dodaj novog korisnika</Link>
                        </li>
                    </ul>
                </div>
            </Sidebar>
        </Grid>
    ) : (
        <p>Nemate dopuštenje da pristupite ovoj stranici</p>
    )
}

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
`

export default UsersPage
