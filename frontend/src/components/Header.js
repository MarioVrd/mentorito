import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import GlobalNews from './GlobalNews'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div>
            <Hello>Pozdrav, {userInfo ? `${userInfo.firstName}` : 'Gost'}! </Hello>
            <GlobalNews />
        </div>
    )
}

const Hello = styled.h3`
    margin: 0.5rem 0 1.5rem;
    font-weight: 700;
`

export default Header
