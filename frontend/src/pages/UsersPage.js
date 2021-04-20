import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getUsers } from '../actions/userActions'
import Alert from '../components/Alert'
import UserCard from '../components/UserCard'
import { ROLE_ADMIN } from '../constants/roles'

const UsersPage = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return userInfo && userInfo.role === ROLE_ADMIN ? (
        <Main>
            <h1>Popis korisnika</h1>
            <Link to="/users/create">Dodaj novog korisnika</Link>
            {loading && 'Loading...'}
            {error && <Alert>{error}</Alert>}
            <CardGrid>
                {users && users.map(user => <UserCard key={user.id} user={user} />)}
            </CardGrid>
        </Main>
    ) : (
        <p>Nemate dopuštenje da pristupite ovoj stranici</p>
    )
}

const Main = styled.main`
    padding: 1.5rem;
`

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
`

export default UsersPage
