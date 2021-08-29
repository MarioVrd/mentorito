import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMyAccount } from '../actions/userActions'
import { Button, Form, Main } from '../assets/styles'
import { STATUS } from '../constants/requestStatusConstants'
import Alert from '../components/Alert'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import {
    firstNameMsg,
    isRequired,
    isValidPassword,
    lastNameMsg,
    passwordMsg
} from '../utils/validateUtils'
import useInput from '../hooks/useInput'

const SettingsPage = () => {
    const [firstName, setFirstName, firstNameTouched, firstNameError] = useInput(
        '',
        isRequired,
        firstNameMsg
    )
    const [lastName, setLastName, lastNameTouched, lastNameError] = useInput(
        '',
        isRequired,
        lastNameMsg
    )
    const [oldPassword, setOldPassword, oldPasswordTouched, oldPasswordError, resetOldPassword] =
        useInput('', isRequired, 'Lozinka je obavezna')
    const [newPassword, setNewPassword, newPasswordTouched, newPasswordError, resetNewPassword] =
        useInput('', isValidPassword, passwordMsg)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { status, error } = userUpdate

    useEffect(() => {
        setFirstName(userInfo.firstName)
        setLastName(userInfo.lastName)
    }, [setFirstName, setLastName, userInfo.firstName, userInfo.lastName])

    const updateAccountHandler = e => {
        e.preventDefault()

        if (firstNameError || lastNameError || oldPasswordError || newPasswordError) return

        dispatch(updateMyAccount(firstName, lastName, oldPassword, newPassword))

        resetOldPassword()
        resetNewPassword()
    }

    useEffect(() => {
        return () => dispatch({ type: USER_UPDATE_RESET })
    }, [dispatch])

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
                    {firstNameTouched && firstNameError && (
                        <Form.Error>{firstNameError}</Form.Error>
                    )}
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
                    {lastNameTouched && lastNameError && <Form.Error>{lastNameError}</Form.Error>}
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="oldPassword">Trenutna lozinka</Form.Label>
                    <Form.Input
                        type="password"
                        id="oldPassword"
                        placeholder="Unesite lozinku"
                        value={oldPassword}
                        required
                        onChange={e => setOldPassword(e.target.value)}
                    />
                    {oldPasswordTouched && oldPasswordError && (
                        <Form.Error>{oldPasswordError}</Form.Error>
                    )}
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
                    {newPasswordTouched && newPasswordError && (
                        <Form.Error>{newPasswordError}</Form.Error>
                    )}
                </Form.Group>

                <Button type="submit" primary block disabled={status === STATUS.loading}>
                    Ažuriraj
                </Button>
            </Form>
        </Main>
    )
}

export default SettingsPage
