import styled from 'styled-components/macro'
import home from '../assets/icons/home'
import book from '../assets/icons/book'
import login from '../assets/icons/login'
import users from '../assets/icons/users'
import settings from '../assets/icons/settings'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../assets/styles'
import { logout } from '../actions/userActions'
import { ROLE_ADMIN } from '../constants/roles'

const SideMenu = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }

    return (
        <Nav>
            <Nav.Logo>
                mentorito<span className="text-accent">.</span>
            </Nav.Logo>
            <Nav.List className="menu">
                <Nav.Item>
                    <Nav.Link exact to="/" activeClassName="active">
                        {home} Početna
                    </Nav.Link>
                </Nav.Item>
                {userInfo ? (
                    <>
                        <Nav.Item>
                            <Nav.Link to="/courses" activeClassName="active">
                                {book} Kolegiji
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to="/settings" activeClassName="active">
                                {settings} Postavke
                            </Nav.Link>
                        </Nav.Item>

                        {userInfo.role === ROLE_ADMIN && (
                            <Nav.Item>
                                <Nav.Link to="/users" activeClassName="active">
                                    {users} Korisnici
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </>
                ) : (
                    <>
                        <Nav.Item>
                            <Nav.Link to="/login" activeClassName="active">
                                {login} Prijava
                            </Nav.Link>
                        </Nav.Item>
                    </>
                )}
            </Nav.List>
            {userInfo && (
                <User>
                    {userInfo.firstName} <Button onClick={handleLogout}>Odjava</Button>
                </User>
            )}
        </Nav>
    )
}

const Nav = styled.nav`
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--clr-grey-100);
    padding: 1rem;
`

Nav.Logo = styled.h1`
    line-height: 1;
    margin: 0.75rem 0 1.25rem;
`

Nav.List = styled.ul`
    list-style: none;
`

Nav.Item = styled.li`
    margin: 0.5rem 0 0.5rem -1rem;
`

Nav.Link = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-top-right-radius: 0.65rem;
    border-bottom-right-radius: 0.65rem;
    transition: background-color 200ms;
    background-color: transparent;
    color: var(--clr-grey-300);

    svg {
        height: 1.1em;
        margin-right: 0.25em;

        * {
            fill: var(--clr-grey-200);
        }
    }

    &:hover,
    &:focus {
        background-color: var(--clr-grey-100);
        outline: none;
        color: var(--clr-grey-300);
    }

    &.active {
        background-color: var(--clr-primary);
        color: var(--clr-white);

        svg * {
            fill: var(--clr-white);
        }

        &:hover,
        &:focus {
            background-color: var(--clr-dark);
        }
    }
`

const User = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        transform: scale(0.85);
    }
`

export default SideMenu
