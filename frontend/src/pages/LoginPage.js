import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { login } from '../actions/userActions'
import { Button, UserForm } from '../assets/styles'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import { USER_LOGOUT } from '../constants/userConstants'

const LoginPage = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        // Redirect to home if user is logged in
        if (userInfo) {
            history.push('/')
        }
    }, [userInfo, history])

    const loginHandler = e => {
        e.preventDefault()
        // reset userLogin data if error occured on previous login for better UX
        dispatch({ type: USER_LOGOUT })
        dispatch(login(email, password))
    }

    return (
        <Main>
            <UserForm onSubmit={loginHandler}>
                <UserForm.Title>Prijava</UserForm.Title>
                {error && <Alert>{error}</Alert>}
                {loading && <Loader />}
                <UserForm.Group>
                    <UserForm.Label htmlFor="email">Email</UserForm.Label>
                    <UserForm.Input
                        type="email"
                        id="email"
                        placeholder="Unesite email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </UserForm.Group>
                <UserForm.Group>
                    <UserForm.Label htmlFor="password">Lozinka</UserForm.Label>
                    <UserForm.Input
                        type="password"
                        id="password"
                        placeholder="Unesite lozinku"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </UserForm.Group>
                <Button type="submit" primary block>
                    Prijava
                </Button>
            </UserForm>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 1.5rem;
`

export default LoginPage
