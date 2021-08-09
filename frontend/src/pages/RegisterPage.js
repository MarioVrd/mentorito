import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { register } from '../actions/userActions'
import { Button, UserForm } from '../assets/styles'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import { availableRoles, ROLE_STUDENT } from '../constants/roles'
import { USER_REGISTER_RESET } from '../constants/userConstants'

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(ROLE_STUDENT)

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { status, error, user } = userRegister

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(firstName, lastName, email, password, role))
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        return () => {
            dispatch({ type: USER_REGISTER_RESET })
        }
    }, [dispatch])

    return (
        <Main>
            <UserForm onSubmit={handleSubmit}>
                <UserForm.Title>Registracija</UserForm.Title>
                {error && <Alert>{error}</Alert>}
                {status === 'loading' && <Loader />}
                {user && (
                    <Alert variant="info">Korisnik je uspješno kreiran (id: {user.id}).</Alert>
                )}
                <UserForm.Group>
                    <UserForm.Label htmlFor="name">Ime</UserForm.Label>
                    <UserForm.Input
                        type="text"
                        id="name"
                        placeholder="Unesite ime"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </UserForm.Group>
                <UserForm.Group>
                    <UserForm.Label htmlFor="surname">Prezime</UserForm.Label>
                    <UserForm.Input
                        type="text"
                        id="surname"
                        placeholder="Unesite prezime"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </UserForm.Group>
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
                <UserForm.Group>
                    <UserForm.Label htmlFor="role">Uloga</UserForm.Label>
                    <select
                        name="role"
                        id="role"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        {availableRoles.map(r => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </UserForm.Group>
                <Button type="submit" primary block>
                    Kreiraj korisnika
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

export default RegisterPage
