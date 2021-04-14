import styled from 'styled-components/macro'
import home from '../assets/icons/home'
import book from '../assets/icons/book'
import settings from '../assets/icons/settings'
import { Link } from 'react-router-dom'

const SideMenu = () => {
    return (
        <Nav>
            <Nav.Logo>
                mentorito<span className="text-accent">.</span>
            </Nav.Logo>
            <Nav.List className="menu">
                <Nav.Item active>
                    <Nav.Link to="/">{home} Početna</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to="/courses">{book} Kolegiji</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to="/settings">{settings} Postavke</Nav.Link>
                </Nav.Item>
            </Nav.List>
            <User>User &gt;</User>
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
    background-color: ${props => (props.active ? 'var(--clr-primary)' : 'transparent')};
    color: ${props => (props.active ? 'var(--clr-white)' : 'var(--clr-grey-300)')};
    border-top-right-radius: 0.65rem;
    border-bottom-right-radius: 0.65rem;
    transition: background-color 200ms;

    svg {
        height: 1.1em;
        margin-right: 0.25em;

        * {
            fill: ${props => (props.active ? '#fff' : 'var(--clr-grey-200)')};
        }
    }

    &:hover,
    &:focus,
    &:focus-within {
        background-color: ${props => (props.active ? 'var(--clr-dark)' : 'var(--clr-grey-100)')};
    }
`

Nav.Link = styled(Link)`
    display: flex;
    align-items: center;
    padding: 1rem;
    color: inherit;
`

const User = styled.div`
    margin-top: auto;
`

export default SideMenu
