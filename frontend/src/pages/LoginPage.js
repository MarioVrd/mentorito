import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../actions/userActions'

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
        <>
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log in</button>
            </form>
        </>
    )
}

export default LoginPage
