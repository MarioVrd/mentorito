import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMyAccount } from '../actions/userActions'
import { Button, Form, Main } from '../assets/styles'
import { STATUS } from '../constants/requestStatusConstants'
import Alert from '../components/Alert'

const SettingsPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { status, error } = userUpdate

    useEffect(() => {
        setFirstName(userInfo.firstName)
        setLastName(userInfo.lastName)
    }, [userInfo.firstName, userInfo.lastName])

    const updateAccountHandler = e => {
        e.preventDefault()

        dispatch(updateMyAccount(firstName, lastName, oldPassword, newPassword))

        setOldPassword('')
        setNewPassword('')
    }

    return (
        <Main>
            <Main.Title>Postavke korisničkog računa</Main.Title>
            <Form onSubmit={updateAccountHandler}>
                {status === STATUS.completed && (
                    <Alert variant="success">Podaci uspješno ažurirani</Alert>
                )}
                {error && <Alert>{error}</Alert>}
                <Form.Group>
                    <Form.Label htmlFor="name">Ime</Form.Label>
                    <Form.Input
                        type="text"
                        id="name"
                        placeholder="Unesite ime"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="surname">Prezime</Form.Label>
                    <Form.Input
                        type="text"
                        id="surname"
                        placeholder="Unesite prezime"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="oldPassword">Trenutna lozinka</Form.Label>
                    <Form.Input
                        type="password"
                        id="oldPassword"
                        placeholder="Unesite lozinku"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="newPassword">Nova lozinka</Form.Label>
                    <Form.Input
                        type="password"
                        id="newPassword"
                        placeholder="Unesite lozinku"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" primary block disabled={status === STATUS.loading}>
                    Ažuriraj
                </Button>
            </Form>
        </Main>
    )
}

export default SettingsPage
