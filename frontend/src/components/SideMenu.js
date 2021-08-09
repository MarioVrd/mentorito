import styled from 'styled-components/macro'
import home from '../assets/icons/home'
import menuIcon from '../assets/icons/menu'
import closeIcon from '../assets/icons/close'
import book from '../assets/icons/book'
import login from '../assets/icons/login'
import users from '../assets/icons/users'
import news from '../assets/icons/news'
import settings from '../assets/icons/settings'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../assets/styles'
import { logout } from '../actions/userActions'
import { ROLE_ADMIN } from '../constants/roles'
import { TOGGLE_MENU } from '../constants/uiConstants'

const SideMenu = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const uiGlobals = useSelector(state => state.uiGlobals)
    const { menuOpened } = uiGlobals

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }

    const toggleMenuHandler = () => {
        dispatch({ type: TOGGLE_MENU })
    }

    return (
        <Nav menuOpened={menuOpened}>
            <Nav.Logo>
                <Link to="/">
                    mentorito<span className="text-accent">.</span>
                </Link>
            </Nav.Logo>
            <Nav.Toggle onClick={toggleMenuHandler}>{menuOpened ? closeIcon : menuIcon}</Nav.Toggle>
            <Nav.List className="menu" menuOpened={menuOpened}>
                <Nav.Item>
                    <Nav.Link exact to="/" activeClassName="active">
                        {home} Početna
                    </Nav.Link>
                </Nav.Item>
                {userInfo ? (
                    <>
                        <Nav.Item>
                            <Nav.Link to="/news" activeClassName="active">
                                {news} Novosti
                            </Nav.Link>
                        </Nav.Item>
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
                <User menuOpened={menuOpened}>
                    {userInfo.firstName} {userInfo.lastName}
                    <Button small onClick={handleLogout}>
                        Odjava
                    </Button>
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
    ${props =>
        props.menuOpened
            ? `
        @media (min-width: 1000px) { 
            width: 100%; 
            position: fixed; 
            background-color: white;
        }`
            : `
        @media (max-width: 999px) {
            position: relative;
            border-bottom: 1px solid var(--clr-grey-100);
            height: auto;
         }`}
`

Nav.Toggle = styled.button`
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    background: none;
    border: none;
    padding: 0.5rem;
    line-height: 1;
    text-align: center;
    cursor: pointer;

    @media (min-width: 1000px) {
        display: none;
    }
`

Nav.Logo = styled.h1`
    line-height: 1;
    margin: 0.75rem 0 1.25rem;

    a {
        color: inherit;
    }
`

Nav.List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: ${props => (props.menuOpened ? 'block' : 'none')};

    @media (min-width: 1000px) {
        display: block;
    }
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

    @media (max-width: 999px) {
        display: ${props => (props.menuOpened ? 'flex' : 'none')};
    }
`

export default SideMenu
