import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { login } from '../actions/userActions'
import { Button } from '../assets/styles'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        // Redirect to home if user is logged in
        if (userInfo) {
            history.push('/')
        }
    }, [userInfo, history])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <Main>
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Input
                        type="email"
                        id="email"
                        placeholder="Unesite email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Lozinka</Form.Label>
                    <Form.Input
                        type="password"
                        id="password"
                        placeholder="Unesite lozinku"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" primary block>
                    Prijava
                </Button>
            </Form>
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

const Form = styled.form`
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.35);
    width: 400px;
    max-width: 100%;
`
Form.Group = styled.div`
    margin-bottom: 1rem;
`

Form.Label = styled.label`
    display: inline-block;
    margin-bottom: 0.25rem;
`

Form.Input = styled.input`
    display: block;
    width: 100%;
    font-size: 0.92rem;
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid var(--clr-grey-200);
`

export default LoginPage
