import styled from 'styled-components/macro'
import home from '../assets/icons/home'
import mycourses from '../assets/icons/mycourses'
import settings from '../assets/icons/settings'

const SideMenu = () => {
    return (
        <Nav>
            <Nav.Logo>
                mentorito<span className="text-accent">.</span>
            </Nav.Logo>
            <Nav.List className="menu">
                <Nav.Item active>
                    <Nav.Link href="/">{home} Početna</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/courses/">{mycourses} Moji kolegiji</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/settings">{settings} Postavke</Nav.Link>
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
    margin: 1rem 0 1.5rem;
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

    svg {
        height: 1.1em;
        margin-right: 0.25em;

        * {
            fill: ${props => (props.active ? '#fff' : 'var(--clr-grey-200)')};
        }
    }
`

Nav.Link = styled.a`
    display: flex;
    align-items: center;
    padding: 1rem;
    color: inherit;
`

const User = styled.div`
    margin-top: auto;
`

export default SideMenu
